from fastapi import APIRouter, Depends
from ..auth.dependencies import get_current_admin  # adjust path if needed

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.get("/dashboard")
def read_admin_dashboard(current_admin: str = Depends(get_current_admin)):
    return {"message": f"Welcome, Admin {current_admin}!"}
