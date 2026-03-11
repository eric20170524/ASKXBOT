from typing import List, Optional, Dict, Any
from app.db.database import get_db_connection

def get_user_organizations(user_id: int) -> List[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT o.*, om.role 
            FROM organizations o
            JOIN organization_members om ON o.id = om.organization_id
            WHERE om.user_id = ?
        """, (user_id,))
        return [dict(row) for row in cursor.fetchall()]

def create_organization(user_id: int, name: str, description: Optional[str] = None) -> Dict[str, Any]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO organizations (name, description)
            VALUES (?, ?)
        """, (name, description))
        org_id = cursor.lastrowid
        
        cursor.execute("""
            INSERT INTO organization_members (organization_id, user_id, role)
            VALUES (?, ?, 'owner')
        """, (org_id, user_id))
        
        conn.commit()
        
        cursor.execute("SELECT * FROM organizations WHERE id = ?", (org_id,))
        return dict(cursor.fetchone())

def get_organization(org_id: int) -> Optional[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM organizations WHERE id = ?", (org_id,))
        row = cursor.fetchone()
        return dict(row) if row else None

def update_organization(org_id: int, name: str, description: Optional[str] = None) -> Optional[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE organizations 
            SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """, (name, description, org_id))
        conn.commit()
        
        return get_organization(org_id)

def get_organization_members(org_id: int) -> List[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT om.id, om.user_id, om.organization_id, om.role, om.created_at,
                   u.first_name, u.last_name, e.email
            FROM organization_members om
            JOIN users u ON om.user_id = u.id
            LEFT JOIN user_emails e ON u.id = e.user_id AND e.is_primary = 1
            WHERE om.organization_id = ?
        """, (org_id,))
        return [dict(row) for row in cursor.fetchall()]
