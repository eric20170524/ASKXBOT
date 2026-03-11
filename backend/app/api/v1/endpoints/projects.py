from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from app.models.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.project import (
    get_projects, create_project, get_project, 
    update_project, delete_project
)

router = APIRouter()

# Mock user dependency for now
def get_current_user_id() -> int:
    return 1

@router.get("/", response_model=List[ProjectResponse])
def list_projects(organization_id: int, user_id: int = Depends(get_current_user_id)):
    """List all projects in an organization."""
    return get_projects(organization_id)

@router.post("/", response_model=ProjectResponse)
def create_new_project(project: ProjectCreate, user_id: int = Depends(get_current_user_id)):
    """Create a new project."""
    return create_project(user_id, project.organization_id, project.name, project.description)

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project_details(project_id: int, user_id: int = Depends(get_current_user_id)):
    """Get project details."""
    project = get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project_details(project_id: int, project: ProjectUpdate, user_id: int = Depends(get_current_user_id)):
    """Update project details."""
    updated = update_project(project_id, project.name, project.description)
    if not updated:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_endpoint(project_id: int, user_id: int = Depends(get_current_user_id)):
    """Delete a project."""
    success = delete_project(project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
