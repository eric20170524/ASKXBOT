from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any

router = APIRouter()

# Mock user dependency for now
def get_current_user_id() -> int:
    return 1

@router.get("/sources")
def list_data_sources(user_id: int = Depends(get_current_user_id)) -> List[Dict[str, Any]]:
    """List all data sources in the context lake."""
    # Mock data
    return [
        {"id": 1, "type": "postgres", "name": "Production DB", "status": "connected"},
        {"id": 2, "type": "gdrive", "name": "Team Drive", "status": "connected"}
    ]

@router.post("/sources")
def add_data_source(source: Dict[str, Any], user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    """Add a new data source."""
    return {"id": 3, "type": source.get("type", "unknown"), "name": source.get("name", "New Source"), "status": "connected"}

@router.delete("/sources/{source_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_data_source(source_id: int, user_id: int = Depends(get_current_user_id)):
    """Remove a data source."""
    pass

@router.get("/workspace")
def get_workspace_status(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    """Get context lake workspace status."""
    return {
        "workspace_id": "ws-123456",
        "status": "running",
        "vm_id": "vm-789012",
        "created_at": "2023-01-01T00:00:00Z"
    }

@router.post("/workspace/reset")
def reset_workspace(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    """Reset the context lake workspace."""
    return {"message": "Workspace reset successfully"}
