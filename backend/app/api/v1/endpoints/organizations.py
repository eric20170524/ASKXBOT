from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models.organization import OrganizationCreate, OrganizationUpdate, OrganizationResponse, MemberResponse
from app.services.organization import (
    get_user_organizations, create_organization, get_organization, 
    update_organization, get_organization_members
)

router = APIRouter()

# Mock user dependency for now
def get_current_user_id() -> int:
    return 1

@router.get("/", response_model=List[OrganizationResponse])
def list_organizations(user_id: int = Depends(get_current_user_id)):
    """List all organizations the user belongs to."""
    return get_user_organizations(user_id)

@router.post("/", response_model=OrganizationResponse)
def create_org(org: OrganizationCreate, user_id: int = Depends(get_current_user_id)):
    """Create a new organization."""
    return create_organization(user_id, org.name, org.description)

@router.get("/{org_id}", response_model=OrganizationResponse)
def get_org(org_id: int, user_id: int = Depends(get_current_user_id)):
    """Get organization details."""
    org = get_organization(org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org

@router.put("/{org_id}", response_model=OrganizationResponse)
def update_org(org_id: int, org: OrganizationUpdate, user_id: int = Depends(get_current_user_id)):
    """Update organization details."""
    updated = update_organization(org_id, org.name, org.description)
    if not updated:
        raise HTTPException(status_code=404, detail="Organization not found")
    return updated

@router.get("/{org_id}/members", response_model=List[MemberResponse])
def list_members(org_id: int, user_id: int = Depends(get_current_user_id)):
    """List members of an organization."""
    return get_organization_members(org_id)
