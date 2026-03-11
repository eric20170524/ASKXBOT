from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class OrganizationBase(BaseModel):
    name: str
    description: Optional[str] = None

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationUpdate(OrganizationBase):
    pass

class OrganizationResponse(OrganizationBase):
    id: int
    created_at: datetime
    updated_at: datetime

class MemberResponse(BaseModel):
    id: int
    user_id: int
    organization_id: int
    role: str
    first_name: str
    last_name: str
    email: str
    created_at: datetime
