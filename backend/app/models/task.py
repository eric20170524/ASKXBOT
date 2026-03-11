from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    name: str
    description: Optional[str] = None
    organization_id: int
    project_id: Optional[int] = None
    status: str = 'pending'

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class TaskResponse(TaskBase):
    id: int
    created_by: int
    created_at: datetime
    updated_at: datetime
