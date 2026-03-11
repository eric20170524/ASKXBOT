from typing import List, Optional, Dict, Any
from app.db.database import get_db_connection

def get_skills(organization_id: Optional[int] = None) -> List[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        if organization_id:
            cursor.execute("""
                SELECT * FROM skills WHERE organization_id = ? OR is_featured = 1
            """, (organization_id,))
        else:
            cursor.execute("""
                SELECT * FROM skills WHERE is_featured = 1
            """)
        return [dict(row) for row in cursor.fetchall()]

def create_skill(user_id: int, name: str, description: Optional[str] = None, organization_id: Optional[int] = None, is_featured: bool = False) -> Dict[str, Any]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO skills (organization_id, name, description, is_featured, created_by)
            VALUES (?, ?, ?, ?, ?)
        """, (organization_id, name, description, is_featured, user_id))
        skill_id = cursor.lastrowid
        conn.commit()
        
        cursor.execute("SELECT * FROM skills WHERE id = ?", (skill_id,))
        return dict(cursor.fetchone())

def get_skill(skill_id: int) -> Optional[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM skills WHERE id = ?", (skill_id,))
        row = cursor.fetchone()
        return dict(row) if row else None

def update_skill(skill_id: int, name: Optional[str] = None, description: Optional[str] = None, is_featured: Optional[bool] = None) -> Optional[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        updates = []
        params = []
        if name is not None:
            updates.append("name = ?")
            params.append(name)
        if description is not None:
            updates.append("description = ?")
            params.append(description)
        if is_featured is not None:
            updates.append("is_featured = ?")
            params.append(is_featured)
            
        if not updates:
            return get_skill(skill_id)
            
        updates.append("updated_at = CURRENT_TIMESTAMP")
        params.append(skill_id)
        
        cursor.execute(f"""
            UPDATE skills 
            SET {', '.join(updates)}
            WHERE id = ?
        """, params)
        conn.commit()
        
        return get_skill(skill_id)

def delete_skill(skill_id: int) -> bool:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM skills WHERE id = ?", (skill_id,))
        conn.commit()
        return cursor.rowcount > 0
