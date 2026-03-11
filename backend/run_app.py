"""
NanoMate Backend Entry Point

Custom entry point for PyInstaller to avoid import issues.
"""

import sys
import os
import traceback

# 影子导入：强迫 PyInstaller 发现并包含这些关键依赖
try:
    import loguru
    import json_repair
    import croniter
    import rich
    import prompt_toolkit
    import litellm
    import fastapi
    import pydantic
except ImportError:
    pass

# 确保当前目录在 Python 路径中
if getattr(sys, 'frozen', False):
    # PyInstaller 打包环境
    base_path = os.path.dirname(sys.executable)
    sys.path.insert(0, base_path)
    # 也添加 backend 目录
    backend_path = os.path.join(base_path, '_internal')
    if os.path.exists(backend_path):
        sys.path.insert(0, backend_path)

import uvicorn

if __name__ == "__main__":
    try:
        from main import app
        is_frozen = getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS')

        # 设置 static 路径环境变量，供 main.py 使用
        if is_frozen:
            # 在打包环境中，static 目录在 _MEIPASS/static 中
            static_path = os.path.join(sys._MEIPASS, 'static')
            os.environ['STATIC_PATH'] = static_path

        uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)
    except Exception:
        # 如果启动崩溃，将错误信息写入文件
        with open("fatal_error.log", "w") as f:
            f.write(traceback.format_exc())
        raise
