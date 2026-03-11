from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any

router = APIRouter()

def get_current_user_id() -> int:
    return 1

@router.get("/status")
def get_github_status(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"connected": False}

@router.post("/connect")
def connect_github(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"connected": True}

@router.post("/disconnect")
def disconnect_github(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"connected": False}

@router.get("/repos")
def list_repos(user_id: int = Depends(get_current_user_id)) -> List[Dict[str, Any]]:
    return []
