"""
NanoMate Backend API Server

FastAPI server for NanoMate CLI operations
"""

import sys
import os
import time
import webbrowser
import threading
import asyncio
from pathlib import Path

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

# 添加项目根目录到 Python 路径（确保 nanobot 模块可导入）
project_root = Path(__file__).resolve().parent.parent
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
from app.api.v1.endpoints import (
    nanobot, account, auth, organizations, dashboard, 
    projects, tasks, skills, context_lake,
    memory, github, billing, settings, channels, api_keys, mcp_servers
)
from app.utils.logger import get_logger, api_logger
from app.db import init_db

# 创建根日志记录器
root_logger = get_logger("nanomate", "backend.log")
root_logger.info(f"Project root: {project_root}")

app = FastAPI(
    title="NanoMate API",
    description="REST API for NanoMate CLI operations",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers (MUST be before StaticFiles mounting to avoid 404/interception)
app.include_router(nanobot.router, prefix="/api/v1/nanobot", tags=["nanomate"])
app.include_router(account.router, prefix="/api/v1/account", tags=["account"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(organizations.router, prefix="/api/v1/organizations", tags=["organizations"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["dashboard"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["projects"])
app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["tasks"])
app.include_router(skills.router, prefix="/api/v1/skills", tags=["skills"])
app.include_router(context_lake.router, prefix="/api/v1/context-lake", tags=["context-lake"])
app.include_router(memory.router, prefix="/api/v1/memory", tags=["memory"])
app.include_router(github.router, prefix="/api/v1/github", tags=["github"])
app.include_router(billing.router, prefix="/api/v1/billing", tags=["billing"])
app.include_router(settings.router, prefix="/api/v1/settings", tags=["settings"])
app.include_router(channels.router, prefix="/api/v1/channels", tags=["channels"])
app.include_router(api_keys.router, prefix="/api/v1/api-keys", tags=["api-keys"])
app.include_router(mcp_servers.router, prefix="/api/v1/mcp-servers", tags=["mcp-servers"])

@app.on_event("startup")
async def startup_event():
    root_logger.info("Initializing database...")
    init_db()
    root_logger.info("Database initialized.")

# Static files (web build)
# 检测打包环境
is_frozen = getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS')
if is_frozen:
    # 打包环境：从环境变量或 _MEIPASS 获取 static 路径
    static_path = Path(os.environ.get('STATIC_PATH', Path(sys._MEIPASS) / 'static'))
else:
    # 开发环境：使用本地 static 目录
    static_path = Path(__file__).parent / "static"

root_logger.info(f"Static path: {static_path}, exists: {static_path.exists()}")

if static_path.exists():
    app.mount("/", StaticFiles(directory=str(static_path), html=True), name="static")


def _open_browser():
    """后台任务：延迟打开浏览器"""
    time.sleep(1.5)  # 等待 uvicorn 启动完成
    url = "http://127.0.0.1:8000"
    root_logger.info(f"Opening browser at {url}")
    webbrowser.open(url)


# 请求日志中间件
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """记录所有 HTTP 请求"""
    start_time = time.time()

    # 记录请求
    root_logger.info(f"[HTTP] {request.method} {request.url.path}")

    try:
        response = await call_next(request)
        duration_ms = (time.time() - start_time) * 1000

        # 记录响应
        root_logger.info(
            f"[HTTP] {request.method} {request.url.path} - {response.status_code} ({duration_ms:.2f}ms)"
        )
        return response
    except Exception as e:
        duration_ms = (time.time() - start_time) * 1000
        root_logger.error(
            f"[HTTP] {request.method} {request.url.path} - ERROR ({duration_ms:.2f}ms): {str(e)}"
        )
        raise


# 全局异常处理
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """全局异常处理"""
    root_logger.error(f"[EXCEPTION] {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)}
  )


@app.get("/health")
def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    root_logger.info("Starting NanoMate API Server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, loop="none")
