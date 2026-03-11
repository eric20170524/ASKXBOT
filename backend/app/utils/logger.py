"""
NanoMate Logger - 日志工具模块

提供统一的日志记录功能，支持控制台和文件输出
"""

import logging
import sys
from logging.handlers import RotatingFileHandler
from pathlib import Path
from datetime import datetime


def get_log_dir() -> Path:
    """获取日志目录"""
    log_dir = Path.home() / ".nanomate" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    return log_dir


def get_logger(
    name: str,
    log_file: str = None,
    level_console: int = logging.INFO,
    level_file: int = logging.DEBUG,
    max_bytes: int = 10 * 1024 * 1024,  # 10MB
    backup_count: int = 5
) -> logging.Logger:
    """
    获取日志记录器

    Args:
        name: 日志记录器名称
        log_file: 日志文件名（可选，默认使用 name.log）
        level_console: 控制台日志级别
        level_file: 文件日志级别
        max_bytes: 单个日志文件最大字节数
        backup_count: 保留的日志文件数量

    Returns:
        配置好的日志记录器
    """
    logger = logging.getLogger(name)

    # 避免重复添加 handler
    if logger.handlers:
        return logger

    logger.setLevel(logging.DEBUG)

    # 日志格式
    formatter = logging.Formatter(
        fmt='%(asctime)s | %(levelname)-8s | %(name)s | %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

    # 控制台 Handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(level_console)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    # 文件 Handler
    if log_file is None:
        log_file = f"{name}.log"

    file_path = get_log_dir() / log_file
    file_handler = RotatingFileHandler(
        file_path,
        maxBytes=max_bytes,
        backupCount=backup_count,
        encoding='utf-8'
    )
    file_handler.setLevel(level_file)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger


# 预定义的日志记录器
api_logger = get_logger("nanomate.api", "api.log")
service_logger = get_logger("nanomate.service", "service.log")
gateway_logger = get_logger("nanomate.gateway", "gateway.log")


def mask_sensitive(value: str, visible_chars: int = 4) -> str:
    """脱敏处理敏感信息"""
    if not value or len(value) <= visible_chars:
        return "***"
    return value[:visible_chars] + "***"


def log_request(logger: logging.Logger, method: str, path: str, params: dict = None):
    """记录 API 请求"""
    logger.info(f"[REQUEST] {method} {path}")
    if params:
        # 脱敏处理敏感参数
        safe_params = {}
        sensitive_keys = {'api_key', 'token', 'password', 'secret', 'bridge_token', 'app_secret', 'client_secret'}
        for k, v in params.items():
            if k.lower() in sensitive_keys:
                safe_params[k] = mask_sensitive(str(v))
            else:
                safe_params[k] = v
        logger.debug(f"[PARAMS] {safe_params}")


def log_response(logger: logging.Logger, method: str, path: str, status: int, duration_ms: float = None):
    """记录 API 响应"""
    status_str = "OK" if status < 400 else "ERROR"
    msg = f"[RESPONSE] {method} {path} - {status} ({status_str})"
    if duration_ms:
        msg += f" - {duration_ms:.2f}ms"
    logger.info(msg)
