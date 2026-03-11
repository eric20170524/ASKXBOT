"""
NanoMate CLI Service - 命令执行器

负责执行 nanobot CLI 命令并返回结果
"""

import asyncio
import json
import os
import re
import signal
import subprocess
import sys
from pathlib import Path
from typing import AsyncGenerator, List, Optional
from dataclasses import dataclass

from app.utils.logger import service_logger, gateway_logger, mask_sensitive


# =============================================================================
# PyInstaller 兼容处理
# =============================================================================

# 检测是否在 PyInstaller 打包环境中
IS_FROZEN = getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS')

# 获取 _MEIPASS 路径（PyInstaller 打包后的资源目录）
if IS_FROZEN:
    MEIPASS = Path(sys._MEIPASS)
else:
    MEIPASS = None


def _get_nanobot_cli() -> list:
    """获取 nanobot CLI 调用方式

    在打包环境中直接调用，不使用 subprocess
    在开发环境中尝试使用 python -m nanobot 以增加平台兼容性
    """
    if IS_FROZEN:
        # 打包环境：返回空列表，表示直接调用（不使用子进程）
        return []
    else:
        # 使用当前 Python 解释器运行模块，避免 PATH 环境变量问题
        return [sys.executable, "-m", "nanobot"]


def _get_project_root() -> Path:
    """获取项目根目录"""
    if IS_FROZEN:
        # 打包环境：从 _MEIPASS 向上查找
        if MEIPASS:
            for parent in [MEIPASS] + list(MEIPASS.parents):
                if (parent / "nanobot").exists():
                    return parent
        # 尝试 exe 同级目录
        exe_dir = Path(sys.executable).parent
        for parent in [exe_dir] + list(exe_dir.parents):
            if (parent / "nanobot").exists():
                return parent
        return Path.home() / ".nanobot"
    else:
        # 开发环境
        current = Path(__file__).resolve()
        return current.parent.parent.parent.parent


def _ensure_nanobot_importable():
    """确保 nanobot 模块可导入"""
    if IS_FROZEN and MEIPASS:
        # 打包环境：nanobot 就在 MEIPASS 目录下
        if (MEIPASS / "nanobot").exists():
            if str(MEIPASS) not in sys.path:
                sys.path.insert(0, str(MEIPASS))
        # 也检查父目录
        for parent in MEIPASS.parents:
            if (parent / "nanobot").exists():
                if str(parent) not in sys.path:
                    sys.path.insert(0, str(parent))
                break
    else:
        project_root = _get_project_root()
        nanobot_path = project_root / "nanobot"
        if nanobot_path.exists():
            if str(project_root) not in sys.path:
                sys.path.insert(0, str(project_root))


# 初始化时确保 nanobot 可导入
_ensure_nanobot_importable()


# =============================================================================
# 核心类和函数
# =============================================================================

@dataclass
class CommandResult:
    """命令执行结果"""
    success: bool
    output: str
    error: str = ""
    returncode: int = 0


class NanobotCLI:
    """Nanobot CLI 命令执行器"""

    def __init__(self):
        self._gateway_process: Optional[subprocess.Popen] = None
        self._agent_process: Optional[subprocess.Popen] = None
        self._gateway_task: Optional[asyncio.Task] = None
        self._agent_task: Optional[asyncio.Task] = None
        self._pid_dir = Path.home() / ".nanobot" / "pids"
        self._pid_dir.mkdir(parents=True, exist_ok=True)

    def _get_pid_file_path(self, process_type: str) -> Path:
        """获取 PID 文件路径"""
        return self._pid_dir / f"{process_type}.pid"

    def _save_pid(self, process_type: str, pid: int) -> None:
        """保存 PID 到文件"""
        pid_file = self._get_pid_file_path(process_type)
        try:
            pid_file.write_text(str(pid), encoding="utf-8")
            service_logger.info(f"[PID] Saved {process_type} PID={pid} to {pid_file}")
        except Exception as e:
            service_logger.warning(f"[PID] Failed to save {process_type} PID: {e}")

    def _load_pid(self, process_type: str) -> Optional[int]:
        """从文件加载 PID"""
        pid_file = self._get_pid_file_path(process_type)
        service_logger.info(f"[PID] Loading {process_type} PID from {pid_file}, exists={pid_file.exists()}")
        if pid_file.exists():
            try:
                pid = int(pid_file.read_text().strip())
                service_logger.info(f"[PID] Loaded {process_type} PID={pid}")
                return pid
            except Exception as e:
                service_logger.warning(f"[PID] Failed to load {process_type} PID: {e}")
        service_logger.info(f"[PID] No PID file found for {process_type}")
        return None

    def _delete_pid(self, process_type: str) -> None:
        """删除 PID 文件"""
        pid_file = self._get_pid_file_path(process_type)
        if pid_file.exists():
            try:
                pid_file.unlink()
                service_logger.info(f"[PID] Deleted {process_type} PID file")
            except Exception as e:
                service_logger.warning(f"[PID] Failed to delete {process_type} PID file: {e}")

    def _is_process_running(self, pid: int) -> bool:
        """检查进程是否在运行"""
        try:
            os.kill(pid, 0)
            return True
        except ProcessLookupError:
            return False
        except PermissionError:
            # 进程存在但没有权限（通常是进程存在）
            return True
        except Exception:
            return False

    def _run_command(
        self,
        args: list[str],
        capture_output: bool = True,
        timeout: int = 30,
        env: Optional[dict] = None
    ) -> CommandResult:
        """同步执行命令"""
        cmd = _get_nanobot_cli()

        # 打包环境：直接调用 nanobot
        if IS_FROZEN:
            return self._run_nanobot_command(args, timeout, env)

        # 开发环境：使用 subprocess
        run_env = os.environ.copy()
        run_env["PYTHONIOENCODING"] = "utf-8"
        if env:
            run_env.update(env)

        service_logger.debug(f"[CMD] Executing: {' '.join(args)}")

        try:
            result = subprocess.run(
                cmd + args, capture_output=capture_output, text=True,
                encoding="utf-8", errors="replace",
                timeout=timeout, env=run_env
            )
            if result.returncode == 0:
                service_logger.debug(f"[CMD] Success: {' '.join(args)}")
            else:
                service_logger.warning(f"[CMD] Failed: {' '.join(args)} - {result.stderr[:100]}")
            return CommandResult(
                success=result.returncode == 0,
                output=result.stdout if result.stdout is not None else "",
                error=result.stderr if result.stderr is not None else "",
                returncode=result.returncode
            )
        except subprocess.TimeoutExpired:
            service_logger.error(f"[CMD] Timeout: {' '.join(args)} after {timeout}s")
            return CommandResult(success=False, output="", error=f"Command timeout after {timeout}s", returncode=-1)
        except FileNotFoundError:
            service_logger.error(f"[CMD] Not found: {cmd[0] if cmd else 'nanobot'}")
            return CommandResult(success=False, output="", error=f"Command not found: {cmd[0] if cmd else 'nanobot'}", returncode=-1)
        except Exception as e:
            service_logger.error(f"[CMD] Error: {' '.join(args)} - {str(e)}")
            return CommandResult(success=False, output="", error=str(e), returncode=-1)

    def _run_nanobot_command(self, args: list[str], timeout: int = 30, env: Optional[dict] = None) -> CommandResult:
        """在打包环境中直接运行 nanobot 命令"""
        from nanobot.cli.commands import app
        import typer

        # 保存原始 argv
        original_argv = sys.argv
        try:
            # 设置命令行参数
            sys.argv = ["nanobot"] + args

            # 直接调用 typer CLI
            cli_obj = typer.main.get_command(app)

            try:
                # 执行命令，standalone_mode=False 避免 sys.exit
                cli_obj.main(args, standalone_mode=False)
                return CommandResult(success=True, output="", error="", returncode=0)
            except SystemExit as e:
                exit_code = e.code if e.code is not None else 0
                return CommandResult(success=exit_code == 0, output="", error="", returncode=exit_code)
            except Exception as e:
                service_logger.error(f"[NANOBOT] Error: {str(e)}")
                return CommandResult(success=False, output="", error=str(e), returncode=1)
        finally:
            # 恢复原始 argv
            sys.argv = original_argv

    async def _run_command_async(
        self, args: list[str], timeout: int = 30,
        env: Optional[dict] = None
    ) -> CommandResult:
        """异步执行命令"""
        # 打包环境：使用 to_thread 运行同步的 _run_nanobot_command
        if IS_FROZEN:
            return await asyncio.to_thread(self._run_nanobot_command, args, timeout, env)

        cmd = _get_nanobot_cli()
        run_env = os.environ.copy()
        run_env["PYTHONIOENCODING"] = "utf-8"
        if env:
            run_env.update(env)

        try:
            process = await asyncio.create_subprocess_exec(
                *cmd, *args, stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE, env=run_env
            )
            try:
                stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=timeout)
                return CommandResult(
                    success=process.returncode == 0,
                    output=stdout.decode("utf-8", errors="replace") if stdout else "",
                    error=stderr.decode("utf-8", errors="replace") if stderr else "",
                    returncode=process.returncode or 0
                )
            except asyncio.TimeoutError:
                try:
                    process.kill()
                    await process.wait()
                except ProcessLookupError:
                    pass
                return CommandResult(success=False, output="", error=f"Command timeout after {timeout}s", returncode=-1)
        except FileNotFoundError:
            return CommandResult(success=False, output="", error=f"Command not found: {cmd[0] if cmd else 'nanobot'}", returncode=-1)
        except Exception as e:
            return CommandResult(success=False, output="", error=str(e), returncode=-1)

    async def chat_stream(self, message: str, session_id: str = "cli:direct", timeout: int = 120) -> AsyncGenerator[str, None]:
        """流式对话"""
        if IS_FROZEN:
            try:
                from nanobot.agent.loop import AgentLoop
                from nanobot.bus.queue import MessageBus
                from nanobot.config.loader import get_data_dir, load_config
                from nanobot.cron.service import CronService
                from nanobot.cli.commands import _make_provider
                from nanobot.utils.helpers import sync_workspace_templates

                config = load_config()
                sync_workspace_templates(config.workspace_path)
                
                bus = MessageBus()
                provider = _make_provider(config)
                cron_store_path = get_data_dir() / "cron" / "jobs.json"
                cron = CronService(cron_store_path)
                
                agent_loop = AgentLoop(
                    bus=bus,
                    provider=provider,
                    workspace=config.workspace_path,
                    model=config.agents.defaults.model,
                    temperature=config.agents.defaults.temperature,
                    max_tokens=config.agents.defaults.max_tokens,
                    max_iterations=config.agents.defaults.max_tool_iterations,
                    memory_window=config.agents.defaults.memory_window,
                    reasoning_effort=config.agents.defaults.reasoning_effort,
                    brave_api_key=config.tools.web.search.api_key or None,
                    web_proxy=config.tools.web.proxy or None,
                    exec_config=config.tools.exec,
                    cron_service=cron,
                    restrict_to_workspace=config.tools.restrict_to_workspace,
                    mcp_servers=config.tools.mcp_servers,
                    channels_config=config.channels,
                )
                
                queue = asyncio.Queue()
                
                async def _cli_progress(content: str, *, tool_hint: bool = False):
                    await queue.put(f"  ↳ {content}\n")
                    
                async def run_once():
                    try:
                        response = await agent_loop.process_direct(message, session_id, on_progress=_cli_progress)
                        await queue.put(f"{response}\n")
                    except Exception as e:
                        await queue.put(f"\n[Error: {str(e)}]\n")
                    finally:
                        await agent_loop.close_mcp()
                        await queue.put(None)
                        
                task = asyncio.create_task(run_once())
                
                try:
                    while True:
                        chunk = await asyncio.wait_for(queue.get(), timeout=timeout)
                        if chunk is None:
                            break
                        yield chunk
                except asyncio.TimeoutError:
                    task.cancel()
                    yield "\n[Error: Command timeout]"
            except Exception as e:
                yield f"\n[Error: {str(e)}]\n"
            return

        cmd = _get_nanobot_cli() + ["agent", "-m", message, "-s", session_id, "--no-markdown"]
        run_env = os.environ.copy()
        run_env["NANOBOT_QUIET"] = "1"
        run_env["PYTHONIOENCODING"] = "utf-8"

        try:
            process = await asyncio.create_subprocess_exec(
                *cmd, stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.STDOUT, env=run_env
            )

            try:
                while True:
                    line = await asyncio.wait_for(process.stdout.readline(), timeout=timeout)
                    if not line:
                        break
                    yield line.decode("utf-8", errors="replace")
                await process.wait()
            except asyncio.TimeoutError:
                try:
                    process.kill()
                    await process.wait()
                except ProcessLookupError:
                    pass
                yield "\n[Error: Command timeout]"
        except Exception as e:
            yield f"\n[Error: {str(e)}]"

    async def status(self) -> dict:
        """获取 nanobot 状态"""
        result = await self._run_command_async(["status"], timeout=10)
        if not result.success and not result.output:
            return {"configured": False, "error": result.error, "message": "NanoMate not configured. Run 'nanobot onboard' first."}

        status_info = {"configured": True, "model": None, "providers": {}}
        for line in result.output.split("\n"):
            if "Model:" in line:
                status_info["model"] = line.split("Model:")[1].strip()
            for provider in ["openrouter", "anthropic", "openai", "deepseek", "groq", "gemini", "minimax", "moonshot", "zhipu", "volcengine", "dashscope", "siliconflow"]:
                if provider.capitalize() in line or provider in line.lower():
                    status_info["providers"][provider] = "✓" in line or "configured" in line.lower()
        return status_info

    async def onboard(self) -> CommandResult:
        """初始化配置"""
        def _sync_onboard():
            try:
                from nanobot.config.loader import get_config_path, load_config, save_config
                from nanobot.config.schema import Config
                from nanobot.utils.helpers import get_workspace_path
                config_path = get_config_path()
                config = Config()
                save_config(config)
                workspace = get_workspace_path()
                workspace.mkdir(parents=True, exist_ok=True)
                return CommandResult(success=True, output=f"Config created at {config_path}\nWorkspace created at {workspace}")
            except Exception as e:
                return CommandResult(success=False, output="", error=str(e))
        
        return await asyncio.to_thread(_sync_onboard)

    async def gateway_start(self, port: int = 18790, verbose: bool = False) -> CommandResult:
        """启动网关"""
        gateway_logger.info(f"Starting gateway on port {port}...")

        if IS_FROZEN:
            # 在打包环境中，检查内部任务是否在运行
            if self._gateway_task and not self._gateway_task.done():
                gateway_logger.warning("Gateway task is already running")
                return CommandResult(success=False, output="", error="Gateway is already running")

            # 清理可能存在的无效 PID 文件
            saved_pid = self._load_pid("gateway")
            if saved_pid:
                self._delete_pid("gateway")
                gateway_logger.info(f"Cleaned up invalid PID file: {saved_pid}")
        else:
            # 非打包模式：检查 PID 文件中的进程是否还在运行
            saved_pid = self._load_pid("gateway")
            if saved_pid and self._is_process_running(saved_pid):
                return CommandResult(success=False, output="", error="Gateway is already running")

        args = ["gateway", "--port", str(port)]
        if verbose:
            args.append("--verbose")

        # 打包环境：使用 to_thread 运行同步的 _run_nanobot_command
        if IS_FROZEN:
            # 在打包环境中，gateway 运行在同一个进程中
            # 使用后台任务启动并保存状态
            async def _start_gateway():
                await asyncio.to_thread(self._run_nanobot_command, args, timeout=5)
            self._gateway_task = asyncio.create_task(_start_gateway())
            # 保存一个特殊标记表示 gateway 已启动
            self._save_pid("gateway", os.getpid())
            gateway_logger.info(f"Gateway starting on port {port} (packaged mode)")
            return CommandResult(success=True, output=f"Gateway starting on port {port}...")

        try:
            cmd = _get_nanobot_cli() + args
            gateway_logger.info(f"[gateway_start] Running command: {' '.join(cmd)}")
            # subprocess.Popen 仍然是同步的，但它不会阻塞，因为它只是启动进程
            self._gateway_process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                shell=(os.name == 'nt')  # 在 Windows 上使用 shell=True
            )
            # 保存 PID 到文件
            self._save_pid("gateway", self._gateway_process.pid)
            gateway_logger.info(f"Gateway started (PID: {self._gateway_process.pid})")

            # 启动后台线程监控进程，捕获输出
            import threading

            def monitor_process(proc, name):
                stdout, stderr = proc.communicate()
                if stderr:
                    gateway_logger.error(f"[{name}] stderr: {stderr}")
                if stdout:
                    gateway_logger.info(f"[{name}] stdout: {stdout}")
                retcode = proc.returncode
                gateway_logger.info(f"[{name}] exited with code: {retcode}")

            monitor_thread = threading.Thread(target=monitor_process, args=(self._gateway_process, "gateway"), daemon=True)
            monitor_thread.start()

            return CommandResult(success=True, output=f"Gateway starting on port {port}...")
        except Exception as e:
            gateway_logger.error(f"Failed to start gateway: {str(e)}")
            return CommandResult(success=False, output="", error=str(e))

    async def gateway_stop(self) -> CommandResult:
        """停止网关"""
        # 检查内存中的进程
        process_running = self._gateway_process and self._gateway_process.poll() is None

        # 检查 PID 文件中的进程
        saved_pid = self._load_pid("gateway")
        pid_running = False
        if saved_pid:
            if IS_FROZEN:
                if self._gateway_task and not self._gateway_task.done():
                    pid_running = True
            else:
                pid_running = self._is_process_running(saved_pid)

        if not process_running and not pid_running:
            # 清理可能存在的旧 PID 文件
            self._delete_pid("gateway")
            return CommandResult(success=False, output="", error="Gateway is not running")

        try:
            if IS_FROZEN and self._gateway_task and not self._gateway_task.done():
                self._gateway_task.cancel()
                self._delete_pid("gateway")
                return CommandResult(success=True, output="Gateway stopped")

            # 在线程中等待停止，避免阻塞
            def _stop():
                if self._gateway_process and self._gateway_process.poll() is None:
                    self._gateway_process.terminate()
                    try:
                        self._gateway_process.wait(timeout=10)
                    except subprocess.TimeoutExpired:
                        self._gateway_process.kill()
                # 删除 PID 文件
                self._delete_pid("gateway")
                return CommandResult(success=True, output="Gateway stopped")

            return await asyncio.to_thread(_stop)
        except Exception as e:
            return CommandResult(success=False, output="", error=str(e))

    def gateway_status(self) -> dict:
        """网关状态 (轻量级查询，保持同步)"""
        gateway_logger.info("[gateway_status] Checking status...")
        # 首先检查内存中的进程
        if self._gateway_process and self._gateway_process.poll() is None:
            gateway_logger.info(f"[gateway_status] Found in memory: running=True, pid={self._gateway_process.pid}")
            return {"running": True, "pid": self._gateway_process.pid}

        # 从 PID 文件检查进程状态
        saved_pid = self._load_pid("gateway")
        gateway_logger.info(f"[gateway_status] Saved PID from file: {saved_pid}")
        if saved_pid:
            # 在打包模式下，gateway 和后端运行在同一进程
            if IS_FROZEN:
                if self._gateway_task and not self._gateway_task.done():
                    gateway_logger.info(f"[gateway_status] Gateway task is running (packaged mode)")
                    return {"running": True, "pid": saved_pid}
            else:
                # 非打包模式：检查 PID 对应的进程是否存在
                is_running = self._is_process_running(saved_pid)
                gateway_logger.info(f"[gateway_status] Process check: pid={saved_pid}, is_running={is_running}")
                if is_running:
                    return {"running": True, "pid": saved_pid}

        # 如果有旧的 PID 文件且端口未被占用，清理无效的 PID 文件
        if saved_pid:
            self._delete_pid("gateway")
            gateway_logger.info(f"[gateway_status] Cleaned up invalid PID file: {saved_pid}")

        gateway_logger.info("[gateway_status] Gateway is not running")
        return {"running": False}

    async def agent_start(self, mode: str = "interactive") -> CommandResult:
        """启动 Agent"""
        if IS_FROZEN:
            if self._agent_task and not self._agent_task.done():
                return CommandResult(success=False, output="", error="Agent is already running")

            saved_pid = self._load_pid("agent")
            if saved_pid:
                self._delete_pid("agent")
                service_logger.info(f"Cleaned up invalid agent PID file: {saved_pid}")
        else:
            # 先检查 PID 文件中的进程是否还在运行
            saved_pid = self._load_pid("agent")
            if saved_pid and self._is_process_running(saved_pid):
                return CommandResult(success=False, output="", error="Agent is already running")

            # 如果 PID 文件存在但进程已退出，清理无效的 PID 文件
            if saved_pid:
                self._delete_pid("agent")
                service_logger.info(f"Cleaned up invalid agent PID file: {saved_pid}")

        args = ["agent"]
        # 注意：nanobot agent 命令没有 -i 参数，message 为空即为交互模式

        # 打包环境：使用 to_thread
        if IS_FROZEN:
            # 在打包环境中，使用后台任务启动
            async def _start_agent():
                await asyncio.to_thread(self._run_nanobot_command, args, timeout=5)
            self._agent_task = asyncio.create_task(_start_agent())
            # 保存当前进程 ID（打包模式下 agent 也运行在同一个进程）
            self._save_pid("agent", os.getpid())
            service_logger.info(f"Agent started in {mode} mode (packaged mode)")
            return CommandResult(success=True, output=f"Agent started in {mode} mode")

        try:
            cmd = _get_nanobot_cli() + args
            self._agent_process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                shell=(os.name == 'nt')
            )
            # 保存 PID 到文件
            self._save_pid("agent", self._agent_process.pid)
            service_logger.info(f"Agent started (PID: {self._agent_process.pid})")

            # 启动后台线程监控进程，捕获输出
            import threading

            def monitor_process(proc, name):
                stdout, stderr = proc.communicate()
                if stderr:
                    service_logger.error(f"[{name}] stderr: {stderr}")
                if stdout:
                    service_logger.info(f"[{name}] stdout: {stdout}")
                retcode = proc.returncode
                service_logger.info(f"[{name}] exited with code: {retcode}")

            monitor_thread = threading.Thread(target=monitor_process, args=(self._agent_process, "agent"), daemon=True)
            monitor_thread.start()

            return CommandResult(success=True, output=f"Agent started in {mode} mode (PID: {self._agent_process.pid})")
        except Exception as e:
            return CommandResult(success=False, output="", error=str(e))

    async def agent_stop(self) -> CommandResult:
        """停止 Agent"""
        # 检查内存中的进程
        process_running = self._agent_process and self._agent_process.poll() is None

        # 检查 PID 文件中的进程
        saved_pid = self._load_pid("agent")
        pid_running = False
        if saved_pid:
            if IS_FROZEN:
                if self._agent_task and not self._agent_task.done():
                    pid_running = True
            else:
                pid_running = self._is_process_running(saved_pid)

        if not process_running and not pid_running:
            # 清理可能存在的旧 PID 文件
            self._delete_pid("agent")
            return CommandResult(success=False, output="", error="Agent is not running")

        try:
            if IS_FROZEN and self._agent_task and not self._agent_task.done():
                self._agent_task.cancel()
                self._delete_pid("agent")
                return CommandResult(success=True, output="Agent stopped")

            def _stop():
                if self._agent_process and self._agent_process.poll() is None:
                    self._agent_process.terminate()
                    try:
                        self._agent_process.wait(timeout=10)
                    except subprocess.TimeoutExpired:
                        self._agent_process.kill()
                # 删除 PID 文件
                self._delete_pid("agent")
                return CommandResult(success=True, output="Agent stopped")

            return await asyncio.to_thread(_stop)
        except Exception as e:
            return CommandResult(success=False, output="", error=str(e))

    def agent_status(self) -> dict:
        """Agent 状态 (轻量级查询，保持同步)"""
        #首先检查内存中的进程
        if self._agent_process and self._agent_process.poll() is None:
            return {"running": True, "pid": self._agent_process.pid}

        # 从 PID 文件检查进程状态
        saved_pid = self._load_pid("agent")
        if saved_pid:
            if IS_FROZEN:
                if self._agent_task and not self._agent_task.done():
                    return {"running": True, "pid": saved_pid}
            else:
                if self._is_process_running(saved_pid):
                    return {"running": True, "pid": saved_pid}

        # 如果有旧的 PID 文件且进程已退出，清理无效的 PID 文件
        if saved_pid:
            self._delete_pid("agent")
            service_logger.info(f"[agent_status] Cleaned up invalid PID file: {saved_pid}")

        return {"running": False}

    async def agent_config_get(self) -> dict:
        """获取 Agent 配置"""
        def _get():
            from nanobot.config.loader import load_config
            config = load_config()
            agents_config = config.agents.defaults
            return {"provider": agents_config.provider, "model": agents_config.model, "max_tokens": agents_config.max_tokens, "temperature": agents_config.temperature}
        
        return await asyncio.to_thread(_get)

    async def agent_config_update(self, config_updates: dict) -> CommandResult:
        """更新 Agent 配置"""
        def _update():
            from nanobot.config.loader import load_config, save_config
            try:
                config = load_config()
                if "provider" in config_updates:
                    config.agents.defaults.provider = config_updates["provider"]
                if "model" in config_updates:
                    config.agents.defaults.model = config_updates["model"]
                if "max_tokens" in config_updates:
                    config.agents.defaults.max_tokens = config_updates["max_tokens"]
                if "temperature" in config_updates:
                    config.agents.defaults.temperature = config_updates["temperature"]
                save_config(config)
                return CommandResult(success=True, output="Agent config updated successfully")
            except Exception as e:
                return CommandResult(success=False, output="", error=str(e))
        
        return await asyncio.to_thread(_update)

    async def channels_status(self) -> dict:
        """获取通道状态"""
        result = await self._run_command_async(["channels", "status"], timeout=10)
        if not result.success and not result.output:
            return {"error": result.error}
        channels = {}
        for line in result.output.split("\n"):
            if "│" in line:
                parts = [p.strip() for p in line.split("│")]
                if len(parts) >= 4 and parts[1] and parts[1] != "Channel":
                    channels[parts[1].lower()] = {"enabled": "✓" in parts[2], "config": parts[3].strip() if len(parts) > 3 else ""}
        return channels

    async def cron_list(self, include_disabled: bool = False) -> list:
        """获取定时任务列表"""
        args = ["cron", "list"]
        if include_disabled:
            args.append("--all")
        result = await self._run_command_async(args, timeout=10)
        if not result.success and not result.output:
            return []
        jobs = []
        for line in result.output.split("\n"):
            if "│" in line and "─" not in line:
                parts = [p.strip() for p in line.split("│")]
                if len(parts) >= 5 and parts[1] != "ID":
                    jobs.append({"id": parts[1], "name": parts[2], "schedule": parts[3], "status": parts[4], "next_run": parts[5] if len(parts) > 5 else ""})
        return jobs

    async def cron_add(self, name: str, message: str, every: Optional[int] = None, cron_expr: Optional[str] = None, deliver: bool = False, to: Optional[str] = None, channel: Optional[str] = None) -> CommandResult:
        """添加定时任务"""
        args = ["cron", "add", "--name", name, "--message", message]
        if every:
            args.extend(["--every", str(every)])
        elif cron_expr:
            args.extend(["--cron", cron_expr])
        if deliver:
            args.append("--deliver")
        if to:
            args.extend(["--to", to])
        if channel:
            args.extend(["--channel", channel])
        return await self._run_command_async(args, timeout=10)

    async def cron_remove(self, job_id: str) -> CommandResult:
        """删除定时任务"""
        return await self._run_command_async(["cron", "remove", job_id], timeout=10)

    async def cron_toggle(self, job_id: str, disable: bool = False) -> CommandResult:
        """切换定时任务状态"""
        args = ["cron", "enable", job_id]
        if disable:
            args.append("--disable")
        return await self._run_command_async(args, timeout=10)

    async def cron_run(self, job_id: str, force: bool = False) -> CommandResult:
        """手动执行定时任务"""
        args = ["cron", "run", job_id]
        if force:
            args.append("--force")
        return await self._run_command_async(args, timeout=60)

    async def provider_login(self, provider: str) -> CommandResult:
        """OAuth 登录"""
        return await self._run_command_async(["provider", "login", provider], timeout=120)

    async def channel_get(self, channel_name: str) -> dict:
        """获取通道配置"""
        def _get():
            from nanobot.config.loader import load_config
            config = load_config()
            channel_map = {"whatsapp": "whatsapp", "telegram": "telegram", "discord": "discord", "feishu": "feishu", "mochat": "mochat", "dingtalk": "dingtalk", "email": "email", "slack": "slack", "qq": "qq", "matrix": "matrix"}
            name = channel_map.get(channel_name.lower())
            if not name:
                return {"error": f"Unknown channel: {channel_name}"}
            channel_config = getattr(config.channels, name, None)
            if not channel_config:
                return {"error": f"Channel not found: {channel_name}"}
            return channel_config.model_dump(mode="json")
        
        return await asyncio.to_thread(_get)

    async def channel_update(self, channel_name: str, config_updates: dict) -> CommandResult:
        """更新通道配置"""
        def _update():
            from nanobot.config.loader import load_config, save_config
            try:
                config = load_config()
                channel_map = {"whatsapp": "whatsapp", "telegram": "telegram", "discord": "discord", "feishu": "feishu", "mochat": "mochat", "dingtalk": "dingtalk", "email": "email", "slack": "slack", "qq": "qq", "matrix": "matrix"}
                name = channel_map.get(channel_name.lower())
                if not name:
                    return CommandResult(success=False, output="", error=f"Unknown channel: {channel_name}")
                channel_config = getattr(config.channels, name, None)
                if not channel_config:
                    return CommandResult(success=False, output="", error=f"Channel not found: {channel_name}")
                for key, value in config_updates.items():
                    if hasattr(channel_config, key):
                        setattr(channel_config, key, value)
                save_config(config)
                return CommandResult(success=True, output=f"Channel {channel_name} updated successfully")
            except Exception as e:
                return CommandResult(success=False, output="", error=str(e))
        
        return await asyncio.to_thread(_update)

    async def channel_toggle(self, channel_name: str, enabled: bool) -> CommandResult:
        """启用/禁用通道"""
        return await self.channel_update(channel_name, {"enabled": enabled})

    async def provider_get(self, provider_name: str) -> dict:
        """获取供应商配置"""
        def _get():
            from nanobot.config.loader import load_config
            config = load_config()
            provider_map = {"custom": "custom", "anthropic": "anthropic", "openai": "openai", "openrouter": "openrouter", "deepseek": "deepseek", "groq": "groq", "zhipu": "zhipu", "dashscope": "dashscope", "vllm": "vllm", "gemini": "gemini", "moonshot": "moonshot", "minimax": "minimax", "aihubmix": "aihubmix", "siliconflow": "siliconflow", "volcengine": "volcengine", "openai_codex": "openai_codex", "github_copilot": "github_copilot"}
            name = provider_map.get(provider_name.lower())
            if not name:
                return {"error": f"Unknown provider: {provider_name}"}
            provider_config = getattr(config.providers, name, None)
            if not provider_config:
                return {"error": f"Provider not found: {provider_name}"}
            data = provider_config.model_dump(by_alias=True, mode="json")
            if "api_key" in data and data["api_key"]:
                ak = data["api_key"]
                data["api_key"] = ak[:4] + "......" + ak[-4:] if len(ak) > 8 else "********"
            return data
        
        return await asyncio.to_thread(_get)

    async def provider_update(self, provider_name: str, config_updates: dict) -> CommandResult:
        """更新供应商配置"""
        def _update():
            from nanobot.config.loader import load_config, save_config
            DEFAULT_API_BASES = {"openai": "https://api.openai.com/v1", "gemini": "https://generativelanguage.googleapis.com/v1beta/openai", "deepseek": "https://api.deepseek.com/v1", "openrouter": "https://openrouter.ai/api/v1", "aihubmix": "https://aihubmix.com/v1", "siliconflow": "https://api.siliconflow.cn/v1", "volcengine": "https://ark.cn-beijing.volces.com/api/v3", "openai_codex": "https://chatgpt.com/backend-api", "moonshot": "https://api.moonshot.ai/v1", "minimax": "https://api.minimax.io/v1"}
            try:
                config = load_config()
                provider_map = {"custom": "custom", "anthropic": "anthropic", "openai": "openai", "openrouter": "openrouter", "deepseek": "deepseek", "groq": "groq", "zhipu": "zhipu", "dashscope": "dashscope", "vllm": "vllm", "gemini": "gemini", "moonshot": "moonshot", "minimax": "minimax", "aihubmix": "aihubmix", "siliconflow": "siliconflow", "volcengine": "volcengine", "openai_codex": "openai_codex", "github_copilot": "github_copilot"}
                name = provider_map.get(provider_name.lower())
                if not name:
                    return CommandResult(success=False, output="", error=f"Unknown provider: {provider_name}")
                if "api_key" in config_updates and config_updates["api_key"]:
                    ak = config_updates["api_key"]
                    if "......" in ak or "********" in ak:
                        config_updates.pop("api_key")
                if "api_key" in config_updates and config_updates["api_key"]:
                    if "api_base" not in config_updates or not config_updates.get("api_base"):
                        default_base = DEFAULT_API_BASES.get(name.lower())
                        if default_base:
                            config_updates["api_base"] = default_base
                provider_config = getattr(config.providers, name, None)
                if not provider_config:
                    return CommandResult(success=False, output="", error=f"Provider not found: {provider_name}")
                for key, value in config_updates.items():
                    if hasattr(provider_config, key):
                        setattr(provider_config, key, value)
                save_config(config)
                return CommandResult(success=True, output=f"Provider {provider_name} updated successfully")
            except Exception as e:
                return CommandResult(success=False, output="", error=str(e))
        
        return await asyncio.to_thread(_update)

    async def provider_clear(self, provider_name: str) -> CommandResult:
        """清除供应商配置"""
        def _clear():
            from nanobot.config.loader import load_config, save_config
            try:
                config = load_config()
                provider_map = {"custom": "custom", "anthropic": "anthropic", "openai": "openai", "openrouter": "openrouter", "deepseek": "deepseek", "groq": "groq", "zhipu": "zhipu", "dashscope": "dashscope", "vllm": "vllm", "gemini": "gemini", "moonshot": "moonshot", "minimax": "minimax", "aihubmix": "aihubmix", "siliconflow": "siliconflow", "volcengine": "volcengine", "openai_codex": "openai_codex", "github_copilot": "github_copilot"}
                name = provider_map.get(provider_name.lower())
                if not name:
                    return CommandResult(success=False, output="", error=f"Unknown provider: {provider_name}")
                provider_config = getattr(config.providers, name, None)
                if not provider_config:
                    return CommandResult(success=True, output=f"Provider {provider_name} already cleared")
                for field in ["api_key", "api_base", "proxy", "token"]:
                    if hasattr(provider_config, field):
                        setattr(provider_config, field, "")
                if hasattr(provider_config, "extra_headers"):
                    setattr(provider_config, "extra_headers", {})
                save_config(config)
                return CommandResult(success=True, output=f"Provider {provider_name} cleared successfully")
            except Exception as e:
                return CommandResult(success=False, output="", error=str(e))
        
        return await asyncio.to_thread(_clear)

    async def provider_test(self, provider_name: str) -> CommandResult:
        """测试供应商连接"""
        from nanobot.config.loader import load_config
        from litellm import acompletion
        from nanobot.providers.registry import find_by_name
        try:
            config = await asyncio.to_thread(load_config)
            provider_map = {"custom": "custom", "anthropic": "anthropic", "openai": "openai", "openrouter": "openrouter", "deepseek": "deepseek", "groq": "groq", "zhipu": "zhipu", "dashscope": "dashscope", "vllm": "vllm", "gemini": "gemini", "moonshot": "moonshot", "minimax": "minimax", "aihubmix": "aihubmix", "siliconflow": "siliconflow", "volcengine": "volcengine", "openai_codex": "openai_codex", "github_copilot": "github_copilot"}
            name = provider_map.get(provider_name.lower())
            if not name:
                return CommandResult(success=False, output="", error=f"Unknown provider: {provider_name}")
            spec = find_by_name(name)
            if not spec:
                return CommandResult(success=False, output="", error=f"Provider {provider_name} registry spec not found")
            test_model = "gpt-3.5-turbo"
            if spec.litellm_prefix:
                test_model = f"{spec.litellm_prefix}/{test_model}"
            kwargs = {}
            if str(config.get_api_key(test_model)):
                kwargs["api_key"] = config.get_api_key(test_model)
            if str(config.get_api_base(test_model)):
                kwargs["api_base"] = config.get_api_base(test_model)
            p = config.providers.get_provider(test_model)
            if p and p.extra_headers:
                kwargs["extra_headers"] = p.extra_headers
            try:
                res = await asyncio.wait_for(acompletion(model=test_model, messages=[{"role": "user", "content": "hi"}], max_tokens=1, **kwargs), timeout=15.0)
                return CommandResult(success=True, output="Connection successful")
            except Exception as e:
                return CommandResult(success=False, output="", error=f"Connection failed: {str(e)}")
        except Exception as e:
            return CommandResult(success=False, output="", error=str(e))

    def _get_log_file_path(self, log_type: str) -> Optional[Path]:
        """获取日志文件路径"""
        from app.utils.logger import get_log_dir
        log_dir = get_log_dir()
        log_files = {"api": "api.log", "service": "service.log", "gateway": "gateway.log"}
        log_file = log_files.get(log_type.lower())
        if not log_file:
            return None
        file_path = log_dir / log_file
        return file_path if file_path.exists() else None

    async def logs_query(self, log_types: Optional[List[str]] = None, level: Optional[str] = None, limit: int = 100) -> List[dict]:
        """查询历史日志"""
        def _query():
            if log_types is None:
                types = ["api", "service", "gateway"]
            else:
                types = log_types
            level_map = {"debug": "DEBUG", "info": "INFO", "warn": "WARNING", "error": "ERROR"}
            target_level = level_map.get(level.lower()) if level else None
            logs = []
            for lt in types:
                file_path = self._get_log_file_path(lt)
                if not file_path:
                    continue
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        lines = f.readlines()
                    for line in lines[-limit:]:
                        line = line.strip()
                        if not line:
                            continue
                        match = re.match(r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s*\|\s*(\w+)\s*\|\s*(\S+)\s*\|\s*(.*)", line)
                        if match:
                            timestamp, lvl, logger_name, message = match.groups()
                            if target_level and lvl != target_level:
                                continue
                            logs.append({"id": f"{lt}:{len(logs)}", "timestamp": timestamp, "level": lvl.lower(), "message": message, "source": logger_name, "type": lt})
                except Exception as e:
                    service_logger.warning(f"Failed to read log file {file_path}: {e}")
            logs.sort(key=lambda x: x["timestamp"], reverse=True)
            return logs[:limit]
        
        return await asyncio.to_thread(_query)

    async def logs_stream(self, log_types: Optional[List[str]] = None, level: Optional[str] = None) -> AsyncGenerator[dict, None]:
        """实时日志流"""
        if log_types is None:
            log_types = ["api", "service", "gateway"]
        level_map = {"debug": "DEBUG", "info": "INFO", "warn": "WARNING", "error": "ERROR"}
        target_level = level_map.get(level.lower()) if level else None
        file_positions = {}
        for log_type in log_types:
            file_path = self._get_log_file_path(log_type)
            if file_path:
                file_positions[file_path] = file_path.stat().st_size if file_path.exists() else 0
        while True:
            for log_type in log_types:
                file_path = self._get_log_file_path(log_type)
                if not file_path:
                    continue
                try:
                    current_size = file_path.stat().st_size
                    last_pos = file_positions.get(file_path, 0)
                    if current_size > last_pos:
                        with open(file_path, "r", encoding="utf-8") as f:
                            f.seek(last_pos)
                            new_lines = f.readlines()
                            file_positions[file_path] = current_size
                        for line in new_lines:
                            line = line.strip()
                            if not line:
                                continue
                            match = re.match(r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s*\|\s*(\w+)\s*\|\s*(\S+)\s*\|\s*(.*)", line)
                            if match:
                                timestamp, lvl, logger_name, message = match.groups()
                                if target_level and lvl != target_level:
                                    continue
                                yield {"id": f"{log_type}:{timestamp}", "timestamp": timestamp, "level": lvl.lower(), "message": message, "source": logger_name, "type": log_type}
                    elif current_size < last_pos:
                        file_positions[file_path] = 0
                except Exception as e:
                    service_logger.warning(f"Error reading log file {file_path}: {e}")
            await asyncio.sleep(0.5)


# 全局实例
_cli = NanobotCLI()


def get_cli() -> NanobotCLI:
    """获取 CLI 实例"""
    return _cli
