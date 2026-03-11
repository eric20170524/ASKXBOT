from typing import List, Optional, Dict, Any
from app.db.database import get_db_connection

def get_projects(organization_id: int) -> List[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM projects WHERE organization_id = ?
        """, (organization_id,))
        return [dict(row) for row in cursor.fetchall()]

def create_project(user_id: int, organization_id: int, name: str, description: Optional[str] = None) -> Dict[str, Any]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO projects (organization_id, name, description, created_by)
            VALUES (?, ?, ?, ?)
        """, (organization_id, name, description, user_id))
        project_id = cursor.lastrowid
        conn.commit()
        
        cursor.execute("SELECT * FROM projects WHERE id = ?", (project_id,))
        return dict(cursor.fetchone())

def get_project(project_id: int) -> Optional[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM projects WHERE id = ?", (project_id,))
        row = cursor.fetchone()
        return dict(row) if row else None

def update_project(project_id: int, name: Optional[str] = None, description: Optional[str] = None) -> Optional[Dict[str, Any]]:
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
            
        if not updates:
            return get_project(project_id)
            
        updates.append("updated_at = CURRENT_TIMESTAMP")
        params.append(project_id)
        
        cursor.execute(f"""
            UPDATE projects 
            SET {', '.join(updates)}
            WHERE id = ?
        """, params)
        conn.commit()
        
        return get_project(project_id)

def delete_project(project_id: int) -> bool:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM projects WHERE id = ?", (project_id,))
        conn.commit()
        return cursor.rowcount > 0
