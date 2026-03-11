from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from app.models.task import TaskCreate, TaskUpdate, TaskResponse
from app.services.task import (
    get_tasks, create_task, get_task, 
    update_task, delete_task
)

router = APIRouter()

# Mock user dependency for now
def get_current_user_id() -> int:
    return 1

@router.get("/", response_model=List[TaskResponse])
def list_tasks(organization_id: int, project_id: Optional[int] = None, user_id: int = Depends(get_current_user_id)):
    """List all tasks in an organization or project."""
    return get_tasks(organization_id, project_id)

@router.post("/", response_model=TaskResponse)
def create_new_task(task: TaskCreate, user_id: int = Depends(get_current_user_id)):
    """Create a new task."""
    return create_task(
        user_id, 
        task.organization_id, 
        task.name, 
        task.description, 
        task.project_id, 
        task.status
    )

@router.get("/{task_id}", response_model=TaskResponse)
def get_task_details(task_id: int, user_id: int = Depends(get_current_user_id)):
    """Get task details."""
    task = get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskResponse)
def update_task_details(task_id: int, task: TaskUpdate, user_id: int = Depends(get_current_user_id)):
    """Update task details."""
    updated = update_task(task_id, task.name, task.description, task.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task_endpoint(task_id: int, user_id: int = Depends(get_current_user_id)):
    """Delete a task."""
    success = delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
