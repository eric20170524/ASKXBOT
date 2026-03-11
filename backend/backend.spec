# -*- mode: python ; coding: utf-8 -*-

import os
import sys

block_cipher = None

# 获取当前工作目录
cwd = os.getcwd()
print(f"Current working directory: {cwd}")

# 获取项目根目录（backend 的父目录）
if cwd.endswith('backend') or cwd.endswith('backend' + os.sep):
    # 当前在 backend 目录，项目根是父目录
    project_root = os.path.dirname(cwd)
else:
    project_root = cwd

# 获取 backend 目录
backend_dir = os.path.join(project_root, 'backend')
if not os.path.exists(backend_dir):
    backend_dir = cwd  # fallback

# 检查 static 目录是否存在
static_dir = os.path.join(backend_dir, 'static')
has_static = os.path.exists(static_dir) and os.path.isdir(static_dir)

# 检查 nanobot 目录是否存在
nanobot_dir = os.path.join(project_root, 'nanobot')
has_nanobot = os.path.exists(nanobot_dir) and os.path.isdir(nanobot_dir)

print(f"Backend dir: {backend_dir}")
print(f"Static dir: {static_dir}")
print(f"Nanobot dir: {nanobot_dir}")

# 准备数据文件
datas = []
if has_static:
    datas.append((static_dir, 'static'))

# 收集 litellm 包中的所有数据文件（JSON 等），保留目录结构
try:
    import litellm
    litellm_pkg_dir = os.path.dirname(litellm.__file__)
    print(f"Found litellm package at: {litellm_pkg_dir}")

    # 收集 litellm 根目录下所有 .json 文件
    datas.append((os.path.join(litellm_pkg_dir, '*.json'), 'litellm'))

    # 递归收集 litellm 所有子目录中的 .json 文件，保留相对目录结构
    for root, dirs, files in os.walk(litellm_pkg_dir):
        for f in files:
            if f.endswith('.json'):
                full_path = os.path.join(root, f)
                # 计算相对于 litellm_pkg_dir 的路径
                rel_path = os.path.relpath(full_path, litellm_pkg_dir)
                # 获取目标目录（去掉文件名，保留相对目录结构）
                dest_dir = os.path.join('litellm', os.path.dirname(rel_path))
                datas.append((full_path, dest_dir))

    print(f"  Added litellm JSON data files: {len([d for d in datas if 'litellm' in str(d[1])])} entries")

except Exception as e:
    print(f"Warning: Could not collect litellm data files: {e}")

if has_nanobot:
    # 将 nanobot 的模板和技能作为数据文件打包，代码部分交给 Analysis 处理
    templates_dir = os.path.join(nanobot_dir, 'templates')
    skills_dir = os.path.join(nanobot_dir, 'skills')
    if os.path.exists(templates_dir):
        datas.append((templates_dir, 'nanobot/templates'))
    if os.path.exists(skills_dir):
        datas.append((skills_dir, 'nanobot/skills'))

a = Analysis(
    ['run_app.py'],
    pathex=[backend_dir, project_root], # 关键：包含项目根目录，使 PyInstaller 能识别 nanobot 包
    binaries=[],
    datas=datas,
    hiddenimports=[
        'uvicorn',
        'uvicorn.logging',
        'uvicorn.loops',
        'uvicorn.loops.auto',
        'uvicorn.protocols',
        'uvicorn.protocols.http',
        'uvicorn.protocols.http.auto',
        'uvicorn.protocols.websockets',
        'uvicorn.protocols.websockets.auto',
        'uvicorn.lifespan',
        'uvicorn.lifespan.on',
        'fastapi',
        'fastapi.openapi',
        'fastapi.middleware',
        'pydantic',
        'pydantic_settings',
        'dotenv',
        'litellm',
        'litellm.main',
        'litellm.litellm_core_utils',
        'litellm.litellm_core_utils.tokenizers',
        'litellm.litellm_core_utils.litellm_logging',
        'litellm.litellm_core_utils.embeddings_utils',
        'litellm.litellm_core_utils.prompt_templates',
        'litellm.litellm_core_utils.token_counter',
        'litellm.litellm_core_utils.get_model_cost_map',
        'litellm.litellm_core_utils.exception_mapping_utils',
        'litellm.llms',
        'litellm.llms.openai_like',
        'litellm.llms.openai_like.transformation',
        'litellm.proxy',
        'litellm.proxy.proxy_server',
        'litellm.integrations',
        'litellm.integrations.lambda_logging',
        'litellm.types',
        'litellm.types.llms',
        'litellm.types.utils',
        'loguru',
        'httpx',
        'main',
        'app',
        # nanobot 核心与依赖 (作为模块分析)
        'nanobot',
        'nanobot.cli',
        'nanobot.cli.commands',
        'nanobot.config',
        'nanobot.config.loader',
        'nanobot.config.schema',
        'nanobot.providers',
        'nanobot.providers.registry',
        'nanobot.providers.custom_provider',
        'nanobot.providers.litellm_provider',
        'nanobot.providers.openai_codex_provider',
        'nanobot.utils',
        'nanobot.utils.helpers',
        'nanobot.agent',
        'nanobot.agent.loop',
        'nanobot.agent.tools',
        'nanobot.bus',
        'nanobot.bus.queue',
        'nanobot.channels',
        'nanobot.channels.manager',
        'nanobot.cron',
        'nanobot.cron.service',
        'nanobot.heartbeat',
        'nanobot.session',
        # 第三方库
        'json_repair',
        'croniter',
        'rich',
        'rich.console',
        'rich.markdown',
        'rich.table',
        'prompt_toolkit',
        'prompt_toolkit.history',
        'prompt_toolkit.formatted_text',
        'prompt_toolkit.patch_stdout',
        'prompt_toolkit.shortcuts',
        'prompt_toolkit.styles',
        'websockets',
        'websocket_client',
        'readability_lxml',
        'lark_oapi',
        'slack_sdk',
        'qq_botpy',
        'python_telegram_bot',
        'dingtalk_stream',
        'mcp',
        'tiktoken',
        'tiktoken_ext',
        'tiktoken_ext.openai_public',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='askXbot-claw',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=None,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.zipfiles,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='nanobot-backend',
)
