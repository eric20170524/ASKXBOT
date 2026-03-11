from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any

router = APIRouter()

def get_current_user_id() -> int:
    return 1

@router.get("/")
def list_memories(user_id: int = Depends(get_current_user_id)) -> List[Dict[str, Any]]:
    return []

@router.post("/")
def add_memory(memory: Dict[str, Any], user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"id": 1, **memory}

@router.put("/{memory_id}")
def update_memory(memory_id: int, memory: Dict[str, Any], user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    return {"id": memory_id, **memory}

@router.delete("/{memory_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_memory(memory_id: int, user_id: int = Depends(get_current_user_id)):
    pass
