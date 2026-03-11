from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from app.models.account import (
    UserProfile, UserProfileUpdate, UserSettings, UserSettingsUpdate,
    UserEmail, AddEmailRequest, UserPhone, AddPhoneRequest,
    UserConnection, AddConnectionRequest, UserDevice, PasswordUpdate
)
from app.services.account import AccountService

router = APIRouter()

def get_account_service():
    # In a real app, we would get the user_id from the authenticated session/token
    return AccountService(user_id=1)

# --- Profile ---

@router.get("/profile", response_model=UserProfile)
async def get_profile(service: AccountService = Depends(get_account_service)):
    profile = service.get_profile()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/profile")
async def update_profile(data: UserProfileUpdate, service: AccountService = Depends(get_account_service)):
    success = service.update_profile(data)
    if not success:
        raise HTTPException(status_code=400, detail="Failed to update profile")
    return {"success": True, "message": "Profile updated successfully"}

# --- Settings ---

@router.get("/settings", response_model=UserSettings)
async def get_settings(service: AccountService = Depends(get_account_service)):
    settings = service.get_settings()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings

@router.put("/settings")
async def update_settings(data: UserSettingsUpdate, service: AccountService = Depends(get_account_service)):
    success = service.update_settings(data)
    if not success:
        raise HTTPException(status_code=400, detail="Failed to update settings")
    return {"success": True, "message": "Settings updated successfully"}

# --- Emails ---

@router.get("/emails", response_model=List[UserEmail])
async def get_emails(service: AccountService = Depends(get_account_service)):
    return service.get_emails()

@router.post("/emails")
async def add_email(data: AddEmailRequest, service: AccountService = Depends(get_account_service)):
    success = service.add_email(data.address)
    if not success:
        raise HTTPException(status_code=400, detail="Email already exists or invalid")
    return {"success": True, "message": "Email added successfully"}

@router.delete("/emails/{email}")
async def remove_email(email: str, service: AccountService = Depends(get_account_service)):
    success = service.remove_email(email)
    if not success:
        raise HTTPException(status_code=400, detail="Cannot remove primary email or email not found")
    return {"success": True, "message": "Email removed successfully"}

@router.put("/emails/{email}/primary")
async def set_primary_email(email: str, service: AccountService = Depends(get_account_service)):
    success = service.set_primary_email(email)
    if not success:
        raise HTTPException(status_code=400, detail="Email not found or not verified")
    return {"success": True, "message": "Primary email updated successfully"}

@router.post("/emails/{email}/verify")
async def verify_email(email: str, service: AccountService = Depends(get_account_service)):
    # In a real app, this would check a verification code
    success = service.verify_email(email)
    if not success:
        raise HTTPException(status_code=400, detail="Email not found")
    return {"success": True, "message": "Email verified successfully"}

# --- Phones ---

@router.get("/phones", response_model=List[UserPhone])
async def get_phones(service: AccountService = Depends(get_account_service)):
    return service.get_phones()

@router.post("/phones")
async def add_phone(data: AddPhoneRequest, service: AccountService = Depends(get_account_service)):
    success = service.add_phone(data.number)
    if not success:
        raise HTTPException(status_code=400, detail="Phone number already exists or invalid")
    return {"success": True, "message": "Phone number added successfully"}

@router.delete("/phones/{phone}")
async def remove_phone(phone: str, service: AccountService = Depends(get_account_service)):
    success = service.remove_phone(phone)
    if not success:
        raise HTTPException(status_code=400, detail="Cannot remove primary phone or phone not found")
    return {"success": True, "message": "Phone number removed successfully"}

@router.put("/phones/{phone}/primary")
async def set_primary_phone(phone: str, service: AccountService = Depends(get_account_service)):
    success = service.set_primary_phone(phone)
    if not success:
        raise HTTPException(status_code=400, detail="Phone not found or not verified")
    return {"success": True, "message": "Primary phone updated successfully"}

@router.post("/phones/{phone}/verify")
async def verify_phone(phone: str, service: AccountService = Depends(get_account_service)):
    # In a real app, this would check a verification code
    success = service.verify_phone(phone)
    if not success:
        raise HTTPException(status_code=400, detail="Phone not found")
    return {"success": True, "message": "Phone verified successfully"}

# --- Connections ---

@router.get("/connections", response_model=List[UserConnection])
async def get_connections(service: AccountService = Depends(get_account_service)):
    return service.get_connections()

@router.post("/connections")
async def add_connection(data: AddConnectionRequest, service: AccountService = Depends(get_account_service)):
    success = service.add_connection(data.provider, data.provider_account_id)
    if not success:
        raise HTTPException(status_code=400, detail="Connection already exists")
    return {"success": True, "message": "Account connected successfully"}

@router.delete("/connections/{provider}")
async def remove_connection(provider: str, service: AccountService = Depends(get_account_service)):
    success = service.remove_connection(provider)
    if not success:
        raise HTTPException(status_code=400, detail="Connection not found")
    return {"success": True, "message": "Account disconnected successfully"}

# --- Devices ---

@router.get("/devices", response_model=List[UserDevice])
async def get_devices(service: AccountService = Depends(get_account_service)):
    return service.get_devices()

@router.delete("/devices/{device_id}")
async def remove_device(device_id: int, service: AccountService = Depends(get_account_service)):
    success = service.remove_device(device_id)
    if not success:
        raise HTTPException(status_code=400, detail="Device not found")
    return {"success": True, "message": "Device removed successfully"}

# --- Password ---

@router.put("/password")
async def update_password(data: PasswordUpdate, service: AccountService = Depends(get_account_service)):
    # In a real app, we would verify current_password and hash new_password
    # For now, we just return success
    return {"success": True, "message": "Password updated successfully"}

# --- Account Deletion ---

@router.delete("/")
async def delete_account(service: AccountService = Depends(get_account_service)):
    # In a real app, we would delete the user and all associated data
    # For now, we just return success
    return {"success": True, "message": "Account deleted successfully"}
