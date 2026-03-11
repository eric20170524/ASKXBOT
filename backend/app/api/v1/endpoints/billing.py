from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any

router = APIRouter()

def get_current_user_id() -> int:
    return 1

@router.get("/credits")
def get_credits(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"balance": 1000, "used_30d": 200, "requests_30d": 50, "lifetime": 1200}

@router.get("/usage")
def get_usage(user_id: int = Depends(get_current_user_id)) -> List[Dict[str, Any]]:
    return []

@router.get("/plans")
def get_plans(user_id: int = Depends(get_current_user_id)) -> List[Dict[str, Any]]:
    return [{"id": "personal", "name": "Personal", "price": 0}, {"id": "team", "name": "Team", "price": 30}]

@router.post("/subscribe")
def subscribe(plan: Dict[str, Any], user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"status": "success", "plan": plan.get("plan_id")}
