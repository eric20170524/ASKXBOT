from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Profile Models
class UserProfile(BaseModel):
    first_name: str
    last_name: str
    avatar_url: Optional[str] = None

class UserProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None

# Settings Models
class UserSettings(BaseModel):
    language: str
    sound_enabled: bool
    notification_sound: str

class UserSettingsUpdate(BaseModel):
    language: Optional[str] = None
    sound_enabled: Optional[bool] = None
    notification_sound: Optional[str] = None

# Email Models
class UserEmail(BaseModel):
    id: int
    address: str
    is_primary: bool
    is_verified: bool
    created_at: datetime

class AddEmailRequest(BaseModel):
    address: EmailStr

# Phone Models
class UserPhone(BaseModel):
    id: int
    number: str
    is_primary: bool
    is_verified: bool
    created_at: datetime

class AddPhoneRequest(BaseModel):
    number: str

# Connection Models
class UserConnection(BaseModel):
    id: int
    provider: str
    provider_account_id: str
    created_at: datetime

class AddConnectionRequest(BaseModel):
    provider: str
    provider_account_id: str

# Device Models
class UserDevice(BaseModel):
    id: int
    device_type: str
    browser: str
    ip_address: Optional[str] = None
    location: Optional[str] = None
    last_active_at: datetime
    is_current: bool = False

# Password Update
class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str
