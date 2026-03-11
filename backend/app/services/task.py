from typing import List, Optional, Dict, Any
from app.db.database import get_db_connection

def get_tasks(organization_id: int, project_id: Optional[int] = None) -> List[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        if project_id:
            cursor.execute("""
                SELECT * FROM tasks WHERE organization_id = ? AND project_id = ?
            """, (organization_id, project_id))
        else:
            cursor.execute("""
                SELECT * FROM tasks WHERE organization_id = ?
            """, (organization_id,))
        return [dict(row) for row in cursor.fetchall()]

def create_task(user_id: int, organization_id: int, name: str, description: Optional[str] = None, project_id: Optional[int] = None, status: str = 'pending') -> Dict[str, Any]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO tasks (organization_id, project_id, name, description, status, created_by)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (organization_id, project_id, name, description, status, user_id))
        task_id = cursor.lastrowid
        conn.commit()
        
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
        return dict(cursor.fetchone())

def get_task(task_id: int) -> Optional[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
        row = cursor.fetchone()
        return dict(row) if row else None

def update_task(task_id: int, name: Optional[str] = None, description: Optional[str] = None, status: Optional[str] = None) -> Optional[Dict[str, Any]]:
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
        if status is not None:
            updates.append("status = ?")
            params.append(status)
            
        if not updates:
            return get_task(task_id)
            
        updates.append("updated_at = CURRENT_TIMESTAMP")
        params.append(task_id)
        
        cursor.execute(f"""
            UPDATE tasks 
            SET {', '.join(updates)}
            WHERE id = ?
        """, params)
        conn.commit()
        
        return get_task(task_id)

def delete_task(task_id: int) -> bool:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
        conn.commit()
        return cursor.rowcount > 0
