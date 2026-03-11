from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SkillBase(BaseModel):
    name: str
    description: Optional[str] = None
    organization_id: Optional[int] = None
    is_featured: bool = False

class SkillCreate(SkillBase):
    pass

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_featured: Optional[bool] = None

class SkillResponse(SkillBase):
    id: int
    created_by: Optional[int] = None
    created_at: datetime
    updated_at: datetime
