from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any

router = APIRouter()

def get_current_user_id() -> int:
    return 1

@router.get("/code-proxy")
def get_code_proxy(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"enabled": True, "auth_method": "org_api_key"}

@router.put("/code-proxy")
def update_code_proxy(settings: Dict[str, Any], user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return settings

@router.get("/proxy-security")
def get_proxy_security(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"allow_network_access": True, "domain_whitelist": "package_managers"}

@router.put("/proxy-security")
def update_proxy_security(settings: Dict[str, Any], user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return settings
