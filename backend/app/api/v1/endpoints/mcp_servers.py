from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any

router = APIRouter()

def get_current_user_id() -> int:
    return 1

@router.get("/")
def list_mcp_servers(user_id: int = Depends(get_current_user_id)) -> List[Dict[str, Any]]:
    return []

@router.post("/")
def install_mcp_server(server_data: Dict[str, Any], user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"id": 1, **server_data}

@router.get("/{server_id}")
def get_mcp_server(server_id: int, user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"id": server_id, "name": "Test Server"}

@router.delete("/{server_id}", status_code=status.HTTP_204_NO_CONTENT)
def uninstall_mcp_server(server_id: int, user_id: int = Depends(get_current_user_id)):
    pass
