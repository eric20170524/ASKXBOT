import sqlite3
from typing import List, Optional, Dict, Any
from app.db.database import get_db_connection
from app.models.account import (
    UserProfile, UserProfileUpdate, UserSettings, UserSettingsUpdate,
    UserEmail, UserPhone, UserConnection, UserDevice
)

class AccountService:
    def __init__(self, user_id: int = 1):
        # We assume user_id 1 for now since there's no auth middleware
        self.user_id = user_id

    # Profile
    def get_profile(self) -> Optional[UserProfile]:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT first_name, last_name, avatar_url FROM users WHERE id = ?", (self.user_id,))
            row = cursor.fetchone()
            if row:
                return UserProfile(first_name=row['first_name'], last_name=row['last_name'], avatar_url=row['avatar_url'])
            return None

    def update_profile(self, data: UserProfileUpdate) -> bool:
        updates = []
        params = []
        if data.first_name is not None:
            updates.append("first_name = ?")
            params.append(data.first_name)
        if data.last_name is not None:
            updates.append("last_name = ?")
            params.append(data.last_name)
        if data.avatar_url is not None:
            updates.append("avatar_url = ?")
            params.append(data.avatar_url)
            
        if not updates:
            return True
            
        updates.append("updated_at = CURRENT_TIMESTAMP")
        params.append(self.user_id)
        
        query = f"UPDATE users SET {', '.join(updates)} WHERE id = ?"
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, tuple(params))
            conn.commit()
            return cursor.rowcount > 0

    # Settings
    def get_settings(self) -> Optional[UserSettings]:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT language, sound_enabled, notification_sound FROM users WHERE id = ?", (self.user_id,))
            row = cursor.fetchone()
            if row:
                return UserSettings(
                    language=row['language'],
                    sound_enabled=bool(row['sound_enabled']),
                    notification_sound=row['notification_sound']
                )
            return None

    def update_settings(self, data: UserSettingsUpdate) -> bool:
        updates = []
        params = []
        if data.language is not None:
            updates.append("language = ?")
            params.append(data.language)
        if data.sound_enabled is not None:
            updates.append("sound_enabled = ?")
            params.append(1 if data.sound_enabled else 0)
        if data.notification_sound is not None:
            updates.append("notification_sound = ?")
            params.append(data.notification_sound)
            
        if not updates:
            return True
            
        updates.append("updated_at = CURRENT_TIMESTAMP")
        params.append(self.user_id)
        
        query = f"UPDATE users SET {', '.join(updates)} WHERE id = ?"
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, tuple(params))
            conn.commit()
            return cursor.rowcount > 0

    # Emails
    def get_emails(self) -> List[UserEmail]:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, email, is_primary, is_verified, created_at FROM user_emails WHERE user_id = ?", (self.user_id,))
            rows = cursor.fetchall()
            return [
                UserEmail(
                    id=row['id'],
                    address=row['email'],
                    is_primary=bool(row['is_primary']),
                    is_verified=bool(row['is_verified']),
                    created_at=row['created_at']
                ) for row in rows
            ]

    def add_email(self, email: str) -> bool:
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO user_emails (user_id, email, is_primary, is_verified) VALUES (?, ?, 0, 0)",
                    (self.user_id, email)
                )
                conn.commit()
                return True
        except sqlite3.IntegrityError:
            return False

    def remove_email(self, email: str) -> bool:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM user_emails WHERE user_id = ? AND email = ? AND is_primary = 0", (self.user_id, email))
            conn.commit()
            return cursor.rowcount > 0

    def set_primary_email(self, email: str) -> bool:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            # First check if email exists and is verified
            cursor.execute("SELECT is_verified FROM user_emails WHERE user_id = ? AND email = ?", (self.user_id, email))
            row = cursor.fetchone()
            if not row or not row['is_verified']:
                return False
                
            # Update all to not primary
            cursor.execute("UPDATE user_emails SET is_primary = 0 WHERE user_id = ?", (self.user_id,))
            # Set selected to primary
            cursor.execute("UPDATE user_emails SET is_primary = 1 WHERE user_id = ? AND email = ?", (self.user_id, email))
            conn.commit()
            return True

    def verify_email(self, email: str) -> bool:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE user_emails SET is_verified = 1 WHERE user_id = ? AND email = ?", (self.user_id, email))
            conn.commit()
            return cursor.rowcount > 0

    # Phones
    def get_phones(self) -> List[UserPhone]:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, phone_number, is_primary, is_verified, created_at FROM user_phones WHERE user_id = ?", (self.user_id,))
            rows = cursor.fetchall()
            return [
                UserPhone(
                    id=row['id'],
                    number=row['phone_number'],
                    is_primary=bool(row['is_primary']),
                    is_verified=bool(row['is_verified']),
                    created_at=row['created_at']
                ) for row in rows
            ]

    def add_phone(self, phone: str) -> bool:
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO user_phones (user_id, phone_number, is_primary, is_verified) VALUES (?, ?, 0, 0)",
                    (self.user_id, phone)
                )
                conn.commit()
                return True
        except sqlite3.IntegrityError:
            return False

    def remove_phone(self, phone: str) -> bool:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM user_phones WHERE user_id = ? AND phone_number = ? AND is_primary = 0", (self.user_id, phone))
            conn.commit()
            return cursor.rowcount > 0

    def set_primary_phone(self, phone: str) -> bool:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            # First check if phone exists and is verified
            cursor.execute("SELECT is_verified FROM user_phones WHERE user_id = ? AND phone_number = ?", (self.user_id, phone))
            row = cursor.fetchone()
            if not row or not row['is_verified']:
                return False
                
            # Update all to not primary
            cursor.execute("UPDATE user_phones SET is_primary = 0 WHERE user_id = ?", (self.user_id,))
            # Set selected to primary
            cursor.execute("UPDATE user_phones SET is_primary = 1 WHERE user_id = ? AND phone_number = ?", (self.user_id, phone))
            conn.commit()
            return True

    def verify_phone(self, phone: str) -> bool:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE user_phones SET is_verified = 1 WHERE user_id = ? AND phone_number = ?", (self.user_id, phone))
            conn.commit()
            return cursor.rowcount > 0

    # Connections
    def get_connections(self) -> List[UserConnection]:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, provider, provider_account_id, created_at FROM user_connections WHERE user_id = ?", (self.user_id,))
            rows = cursor.fetchall()
            return [
                UserConnection(
                    id=row['id'],
                    provider=row['provider'],
                    provider_account_id=row['provider_account_id'],
                    created_at=row['created_at']
                ) for row in rows
            ]

    def add_connection(self, provider: str, account_id: str) -> bool:
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO user_connections (user_id, provider, provider_account_id) VALUES (?, ?, ?)",
                    (self.user_id, provider, account_id)
                )
                conn.commit()
                return True
        except sqlite3.IntegrityError:
            return False

    def remove_connection(self, provider: str) -> bool:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM user_connections WHERE user_id = ? AND provider = ?", (self.user_id, provider))
            conn.commit()
            return cursor.rowcount > 0

    # Devices
    def get_devices(self) -> List[UserDevice]:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, device_type, browser, ip_address, location, last_active_at FROM user_devices WHERE user_id = ?", (self.user_id,))
            rows = cursor.fetchall()
            return [
                UserDevice(
                    id=row['id'],
                    device_type=row['device_type'],
                    browser=row['browser'],
                    ip_address=row['ip_address'],
                    location=row['location'],
                    last_active_at=row['last_active_at'],
                    is_current=False # Should be determined by session
                ) for row in rows
            ]

    def remove_device(self, device_id: int) -> bool:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM user_devices WHERE user_id = ? AND id = ?", (self.user_id, device_id))
            conn.commit()
            return cursor.rowcount > 0
