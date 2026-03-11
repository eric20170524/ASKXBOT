from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from app.models.skill import SkillCreate, SkillUpdate, SkillResponse
from app.services.skill import (
    get_skills, create_skill, get_skill, 
    update_skill, delete_skill
)

router = APIRouter()

# Mock user dependency for now
def get_current_user_id() -> int:
    return 1

@router.get("/", response_model=List[SkillResponse])
def list_skills(organization_id: Optional[int] = None, user_id: int = Depends(get_current_user_id)):
    """List all skills (team and featured)."""
    return get_skills(organization_id)

@router.post("/", response_model=SkillResponse)
def create_new_skill(skill: SkillCreate, user_id: int = Depends(get_current_user_id)):
    """Create a new skill."""
    return create_skill(
        user_id, 
        skill.name, 
        skill.description, 
        skill.organization_id, 
        skill.is_featured
    )

@router.get("/{skill_id}", response_model=SkillResponse)
def get_skill_details(skill_id: int, user_id: int = Depends(get_current_user_id)):
    """Get skill details."""
    skill = get_skill(skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill

@router.put("/{skill_id}", response_model=SkillResponse)
def update_skill_details(skill_id: int, skill: SkillUpdate, user_id: int = Depends(get_current_user_id)):
    """Update skill details."""
    updated = update_skill(skill_id, skill.name, skill.description, skill.is_featured)
    if not updated:
        raise HTTPException(status_code=404, detail="Skill not found")
    return updated

@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_skill_endpoint(skill_id: int, user_id: int = Depends(get_current_user_id)):
    """Delete a skill."""
    success = delete_skill(skill_id)
    if not success:
        raise HTTPException(status_code=404, detail="Skill not found")
