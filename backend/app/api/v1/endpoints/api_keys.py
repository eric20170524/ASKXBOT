from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any

router = APIRouter()

def get_current_user_id() -> int:
    return 1

@router.get("/")
def list_api_keys(user_id: int = Depends(get_current_user_id)) -> List[Dict[str, Any]]:
    return []

@router.post("/")
def create_api_key(key_data: Dict[str, Any], user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"id": 1, "name": key_data.get("name"), "key": "sk_test_123456789"}

@router.delete("/{key_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_api_key(key_id: int, user_id: int = Depends(get_current_user_id)):
    pass
