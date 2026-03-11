"""
NanoMate API Router

提供 nanobot CLI 操作的 REST API
"""

import asyncio
import json
import time
from typing import Optional
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.utils.logger import api_logger, mask_sensitive


router = APIRouter()


# ============== 请求/响应模型 ==============

class OnboardRequest(BaseModel):
    """初始化请求"""
    pass


class ChatRequest(BaseModel):
    """对话请求"""
    message: str
    session_id: str = "cli:direct"
    markdown: bool = True


class GatewayStartRequest(BaseModel):
    """网关启动请求"""
    port: int = 18790
    verbose: bool = False


class AgentStartRequest(BaseModel):
    """Agent 启动请求"""
    mode: str = "interactive"  # "interactive" or "daemon"


class AgentConfigUpdateRequest(BaseModel):
    """Agent 配置更新请求"""
    provider: Optional[str] = None
    model: Optional[str] = None
    max_tokens: Optional[int] = None
    temperature: Optional[float] = None


class CronAddRequest(BaseModel):
    """添加定时任务请求"""
    name: str
    message: str
    every: Optional[int] = None
    cron_expr: Optional[str] = None
    tz: Optional[str] = None
    deliver: bool = False
    to: Optional[str] = None
    channel: Optional[str] = None


class CronToggleRequest(BaseModel):
    """定时任务状态切换请求"""
    disable: bool = False


class ProviderLoginRequest(BaseModel):
    """Provider 登录请求"""
    provider: str


class ProviderUpdateRequest(BaseModel):
    """供应商配置更新请求"""
    api_key: Optional[str] = None
    api_base: Optional[str] = None
    extra_headers: Optional[dict[str, str]] = None


class ChannelUpdateRequest(BaseModel):
    """通道配置更新请求"""
    enabled: Optional[bool] = None
    # WhatsApp
    bridge_url: Optional[str] = None
    bridge_token: Optional[str] = None
    allow_from: Optional[list[str]] = None
    # Telegram
    token: Optional[str] = None
    proxy: Optional[str] = None
    reply_to_message: Optional[bool] = None
    # Discord
    gateway_url: Optional[str] = None
    intents: Optional[int] = None
    # Feishu
    app_id: Optional[str] = None
    app_secret: Optional[str] = None
    encrypt_key: Optional[str] = None
    verification_token: Optional[str] = None
    react_emoji: Optional[str] = None
    # Mochat
    base_url: Optional[str] = None
    socket_url: Optional[str] = None
    claw_token: Optional[str] = None
    agent_user_id: Optional[str] = None
    sessions: Optional[list[str]] = None
    panels: Optional[list[str]] = None
    # DingTalk
    client_id: Optional[str] = None
    client_secret: Optional[str] = None
    # Email
    imap_host: Optional[str] = None
    imap_port: Optional[int] = None
    imap_username: Optional[str] = None
    imap_password: Optional[str] = None
    smtp_host: Optional[str] = None
    smtp_port: Optional[int] = None
    smtp_username: Optional[str] = None
    smtp_password: Optional[str] = None
    from_address: Optional[str] = None
    # Slack
    app_token: Optional[str] = None
    bot_token: Optional[str] = None
    # Matrix
    homeserver: Optional[str] = None
    access_token: Optional[str] = None
    user_id: Optional[str] = None
    # QQ
    uin: Optional[str] = None
    password: Optional[str] = None
    # Generic
    # 其他字段可以通过 extra 传递


class ChannelToggleRequest(BaseModel):
    """通道启用/禁用请求"""
    enabled: bool = True


# ============== 依赖 ==============

def get_nanobot_service():
    """获取 nanobot CLI 服务"""
    from app.services.nanobot import get_cli
    return get_cli()


# ============== 基础 API ==============

@router.get("/status")
async def get_status(service=Depends(get_nanobot_service)):
    """获取 nanobot 状态"""
    try:
        status_info = await service.status()
        return status_info
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/onboard")
async def onboard(
    request: OnboardRequest,
    service=Depends(get_nanobot_service)
):
    """初始化 nanobot 配置"""
    api_logger.info("[ONBOARD] Starting NanoMate initialization...")
    try:
        result = await service.onboard()
        if result.success:
            api_logger.info("[ONBOARD] Success")
            return {"success": True, "message": result.output}
        else:
            api_logger.warning(f"[ONBOARD] Failed: {result.error}")
            raise HTTPException(status_code=400, detail=result.error)
    except Exception as e:
        api_logger.error(f"[ONBOARD] Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ============== Agent API ==============

@router.post("/agent/chat")
async def chat(
    request: ChatRequest,
    service=Depends(get_nanobot_service)
):
    """发送消息到 agent (流式响应)"""
    from fastapi.responses import StreamingResponse
    import asyncio
    import traceback

    async def generate():
        try:
            async for chunk in service.chat_stream(
                message=request.message,
                session_id=request.session_id
            ):
                yield f"data: {json.dumps({'content': chunk})}\n\n"

            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': traceback.format_exc()})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )


@router.post("/agent/chat/sync")
async def chat_sync(
    request: ChatRequest,
    service=Depends(get_nanobot_service)
):
    """发送消息到 agent (同步响应)"""
    import asyncio

    async def run_chat():
        chunks = []
        async for chunk in service.chat_stream(
            message=request.message,
            session_id=request.session_id
        ):
            chunks.append(chunk)
        return "".join(chunks)

    try:
        result = await asyncio.wait_for(run_chat(), timeout=120)
        return {"success": True, "response": result}
    except asyncio.TimeoutError:
        raise HTTPException(status_code=504, detail="Request timeout")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============== Agent 控制 API ==============

@router.get("/agent/status")
async def agent_status(service=Depends(get_nanobot_service)):
    """获取 Agent 状态"""
    return service.agent_status()


@router.post("/agent/start")
async def agent_start(
    request: AgentStartRequest,
    service=Depends(get_nanobot_service)
):
    """启动 Agent"""
    api_logger.info(f"[AGENT] Starting agent in {request.mode} mode...")
    result = await service.agent_start(mode=request.mode)

    if result.success:
        api_logger.info(f"[AGENT] Started successfully")
        return {"success": True, "message": result.output}
    else:
        api_logger.warning(f"[AGENT] Failed to start: {result.error}")
        raise HTTPException(status_code=400, detail=result.error)


@router.post("/agent/stop")
async def agent_stop(service=Depends(get_nanobot_service)):
    """停止 Agent"""
    api_logger.info("[AGENT] Stopping agent...")
    result = await service.agent_stop()

    if result.success:
        api_logger.info("[AGENT] Stopped successfully")
        return {"success": True, "message": result.output}
    else:
        api_logger.warning(f"[AGENT] Failed to stop: {result.error}")
        raise HTTPException(status_code=400, detail=result.error)


@router.get("/agent/config")
async def agent_config_get(service=Depends(get_nanobot_service)):
    """获取 Agent 配置"""
    return await service.agent_config_get()


@router.put("/agent/config")
async def agent_config_update(
    request: AgentConfigUpdateRequest,
    service=Depends(get_nanobot_service)
):
    """更新 Agent 配置"""
    config_updates = {k: v for k, v in request.model_dump().items() if v is not None}

    api_logger.info(f"[AGENT] Updating config: {config_updates}")
    result = await service.agent_config_update(config_updates)

    if result.success:
        api_logger.info("[AGENT] Config updated successfully")
        return {"success": True, "message": result.output}
    else:
        api_logger.warning(f"[AGENT] Failed to update config: {result.error}")
        raise HTTPException(status_code=400, detail=result.error)


# ============== Gateway API ==============

gateway_router = APIRouter()


@gateway_router.get("/status")
async def gateway_status(service=Depends(get_nanobot_service)):
    """获取网关状态"""
    return service.gateway_status()


@gateway_router.post("/start")
async def gateway_start(
    request: GatewayStartRequest,
    service=Depends(get_nanobot_service)
):
    """启动网关"""
    api_logger.info(f"[GATEWAY] Starting gateway on port {request.port}...")
    result = await service.gateway_start(
        port=request.port,
        verbose=request.verbose
    )

    if result.success:
        api_logger.info(f"[GATEWAY] Started successfully")
        return {"success": True, "message": result.output}
    else:
        api_logger.warning(f"[GATEWAY] Failed to start: {result.error}")
        raise HTTPException(status_code=400, detail=result.error)


@gateway_router.post("/stop")
async def gateway_stop(service=Depends(get_nanobot_service)):
    """停止网关"""
    api_logger.info("[GATEWAY] Stopping gateway...")
    result = await service.gateway_stop()

    if result.success:
        api_logger.info("[GATEWAY] Stopped successfully")
        return {"success": True, "message": result.output}
    else:
        api_logger.warning(f"[GATEWAY] Failed to stop: {result.error}")
        raise HTTPException(status_code=400, detail=result.error)


# ============== Channels API ==============

channels_router = APIRouter()


@channels_router.get("/status")
async def channels_status(service=Depends(get_nanobot_service)):
    """获取通道状态"""
    return await service.channels_status()


@channels_router.post("/login")
async def channels_login(service=Depends(get_nanobot_service)):
    """WhatsApp QR 登录 (返回说明)"""
    # Note: 这是一个长时间运行的进程，需要通过 WebSocket 或 SSE 处理
    return {
        "message": "Please run 'nanobot channels login' in terminal to scan QR code",
        "note": "This command requires interactive terminal"
    }


@channels_router.get("/{channel_name}")
async def channel_get(
    channel_name: str,
    service=Depends(get_nanobot_service)
):
    """获取通道配置"""
    result = await service.channel_get(channel_name)

    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])

    return result


@channels_router.put("/{channel_name}")
async def channel_update(
    channel_name: str,
    request: ChannelUpdateRequest,
    service=Depends(get_nanobot_service)
):
    """更新通道配置"""
    # 过滤掉 None 值
    config_updates = {k: v for k, v in request.model_dump().items() if v is not None}

    api_logger.info(f"[CHANNEL] Updating channel '{channel_name}'")
    api_logger.debug(f"[CHANNEL] Config keys: {list(config_updates.keys())}")

    result = await service.channel_update(channel_name, config_updates)

    if result.success:
        api_logger.info(f"[CHANNEL] Channel '{channel_name}' updated successfully")
        return {"success": True, "message": result.output}
    else:
        api_logger.warning(f"[CHANNEL] Failed to update channel '{channel_name}': {result.error}")
        raise HTTPException(status_code=400, detail=result.error)


@channels_router.post("/{channel_name}/toggle")
async def channel_toggle(
    channel_name: str,
    request: ChannelToggleRequest,
    service=Depends(get_nanobot_service)
):
    """启用/禁用通道"""
    api_logger.info(f"[CHANNEL] Toggling channel '{channel_name}' to {request.enabled}")
    result = await service.channel_toggle(channel_name, request.enabled)

    if result.success:
        return {"success": True, "message": result.output}
    else:
        raise HTTPException(status_code=400, detail=result.error)


# ============== Cron API ==============

cron_router = APIRouter()


@cron_router.get("/list")
async def cron_list(
    all: bool = False,
    service=Depends(get_nanobot_service)
):
    """获取定时任务列表"""
    jobs = await service.cron_list(include_disabled=all)
    return {"jobs": jobs}


@cron_router.post("/add")
async def cron_add(
    request: CronAddRequest,
    service=Depends(get_nanobot_service)
):
    """添加定时任务"""
    api_logger.info(f"[CRON] Adding cron job '{request.name}'")
    result = await service.cron_add(
        name=request.name,
        message=request.message,
        every=request.every,
        cron_expr=request.cron_expr,
        deliver=request.deliver,
        to=request.to,
        channel=request.channel
    )

    if result.success:
        api_logger.info(f"[CRON] Job '{request.name}' added successfully")
        return {"success": True, "message": result.output}
    else:
        raise HTTPException(status_code=400, detail=result.error)


@cron_router.delete("/{job_id}")
async def cron_remove(
    job_id: str,
    service=Depends(get_nanobot_service)
):
    """删除定时任务"""
    result = await service.cron_remove(job_id)

    if result.success:
        return {"success": True, "message": result.output}
    else:
        raise HTTPException(status_code=400, detail=result.error)


@cron_router.post("/{job_id}/toggle")
async def cron_toggle(
    job_id: str,
    request: CronToggleRequest,
    service=Depends(get_nanobot_service)
):
    """启用/禁用定时任务"""
    result = await service.cron_toggle(job_id, disable=request.disable)

    if result.success:
        return {"success": True, "message": result.output}
    else:
        raise HTTPException(status_code=400, detail=result.error)


@cron_router.post("/{job_id}/run")
async def cron_run(
    job_id: str,
    force: bool = False,
    service=Depends(get_nanobot_service)
):
    """手动执行定时任务"""
    result = await service.cron_run(job_id, force=force)

    if result.success:
        return {"success": True, "response": result.output}
    else:
        raise HTTPException(status_code=400, detail=result.error)


# ============== Provider API ==============

provider_router = APIRouter()


@provider_router.post("/login")
async def provider_login(
    request: ProviderLoginRequest,
    service=Depends(get_nanobot_service)
):
    """OAuth 登录"""
    result = await service.provider_login(request.provider)

    if result.success:
        return {"success": True, "message": result.output}
    else:
        raise HTTPException(status_code=400, detail=result.error)


@provider_router.get("/{provider_name}")
async def provider_get(
    provider_name: str,
    service=Depends(get_nanobot_service)
):
    """获取供应商配置"""
    result = await service.provider_get(provider_name)

    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])

    return result


@provider_router.put("/{provider_name}")
async def provider_update(
    provider_name: str,
    request: ProviderUpdateRequest,
    service=Depends(get_nanobot_service)
):
    """更新供应商配置"""
    # 过滤掉 None 值
    config_updates = {k: v for k, v in request.model_dump().items() if v is not None}

    api_logger.info(f"[PROVIDER] Updating provider '{provider_name}'")
    if 'api_key' in config_updates and config_updates['api_key']:
        api_logger.debug(f"[PROVIDER] API key provided (masked): {mask_sensitive(config_updates['api_key'])}")
    if 'api_base' in config_updates and config_updates['api_base']:
        api_logger.debug(f"[PROVIDER] API base: {config_updates['api_base']}")

    result = await service.provider_update(provider_name, config_updates)

    if result.success:
        api_logger.info(f"[PROVIDER] Provider '{provider_name}' updated successfully")
        return {"success": True, "message": result.output}
    else:
        api_logger.warning(f"[PROVIDER] Failed to update provider '{provider_name}': {result.error}")
        raise HTTPException(status_code=400, detail=result.error)


@provider_router.delete("/{provider_name}")
async def provider_clear(
    provider_name: str,
    service=Depends(get_nanobot_service)
):
    """清除供应商配置"""
    result = await service.provider_clear(provider_name)
    if result.success:
        api_logger.info(f"[PROVIDER] Provider '{provider_name}' cleared successfully")
        return {"success": True, "message": result.output}
    else:
        api_logger.warning(f"[PROVIDER] Failed to clear provider '{provider_name}': {result.error}")
        raise HTTPException(status_code=400, detail=result.error)


@provider_router.post("/{provider_name}/test")
async def provider_test_route(
    provider_name: str,
    service=Depends(get_nanobot_service)
):
    """测试供应商连接"""
    result = await service.provider_test(provider_name)
    if result.success:
        return {"success": True, "message": result.output}
    else:
        raise HTTPException(status_code=400, detail=result.error)


# ============== Logs API ==============

logs_router = APIRouter()


class LogsQueryParams(BaseModel):
    """日志查询参数"""
    log_types: Optional[list[str]] = None
    level: Optional[str] = None
    limit: int = 100


@logs_router.get("/query")
async def logs_query(
    log_types: Optional[str] = None,
    level: Optional[str] = None,
    limit: int = 100,
    service=Depends(get_nanobot_service)
):
    """
    查询历史日志

    - log_types: 逗号分隔的日志类型，如 "api,service,gateway"
    - level: 日志级别 (debug, info, warn, error)
    - limit: 返回条数限制
    """
    # 解析 log_types
    types = None
    if log_types:
        types = [t.strip() for t in log_types.split(",")]

    api_logger.debug(f"[LOGS] Query logs: types={types}, level={level}, limit={limit}")

    logs = await service.logs_query(log_types=types, level=level, limit=limit)

    return {"logs": logs}


@logs_router.get("/stream")
async def logs_stream(
    log_types: Optional[str] = None,
    level: Optional[str] = None,
    service=Depends(get_nanobot_service)
):
    """
    实时日志流 (SSE)

    - log_types: 逗号分隔的日志类型，如 "api,service,gateway"
    - level: 日志级别 (debug, info, warn, error)
    """
    # 解析 log_types
    types = None
    if log_types:
        types = [t.strip() for t in log_types.split(",")]

    api_logger.debug(f"[LOGS] Starting log stream: types={types}, level={level}")

    async def generate():
        try:
            async for log_entry in service.logs_stream(log_types=types, level=level):
                yield f"data: {json.dumps(log_entry)}\n\n"
        except Exception as e:
            api_logger.error(f"[LOGS] Stream error: {e}")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


# 添加子路由
router.include_router(gateway_router, prefix="/gateway", tags=["gateway"])
router.include_router(channels_router, prefix="/channels", tags=["channels"])
router.include_router(cron_router, prefix="/cron", tags=["cron"])
router.include_router(provider_router, prefix="/providers", tags=["provider"])
router.include_router(logs_router, prefix="/logs", tags=["logs"])
