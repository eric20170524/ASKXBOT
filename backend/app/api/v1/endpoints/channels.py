from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any

router = APIRouter()

def get_current_user_id() -> int:
    return 1

@router.get("/status")
def get_channels_status(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"slack": False, "telegram": False}

@router.post("/slack/connect")
def connect_slack(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"slack": True}

@router.post("/telegram/connect")
def connect_telegram(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"telegram": True}
