from fastapi import APIRouter, Depends
from typing import Dict, Any

router = APIRouter()

# Mock user dependency for now
def get_current_user_id() -> int:
    return 1

@router.get("/stats")
def get_dashboard_stats(user_id: int = Depends(get_current_user_id)) -> Dict[str, Any]:
    """Get dashboard statistics."""
    # Mock data for now
    return {
        "recent_activity": [
            {"id": 1, "type": "task_completed", "message": "Task 'Setup CI/CD' completed", "time": "2 hours ago"},
            {"id": 2, "type": "project_created", "message": "Project 'New Website' created", "time": "1 day ago"}
        ],
        "team_members_count": 5,
        "active_projects_count": 3,
        "pending_tasks_count": 12
    }
