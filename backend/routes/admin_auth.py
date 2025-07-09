from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas import AdminCreate, AdminLogin
from ..models import Admin
from ..database import get_db
from ..auth.jwt import create_access_token
from ..auth.hashing import hash_password, verify_password

router = APIRouter()

@router.post("/admin/signup")
def signup(admin: AdminCreate, db: Session = Depends(get_db)):
    existing = db.query(Admin).filter(Admin.username == admin.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_admin = Admin(username=admin.username, hashed_password=hash_password(admin.password))
    db.add(new_admin)
    db.commit()
    return {"msg": "Admin created"}

@router.post("/admin/login")
def login(admin: AdminLogin, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.username == admin.username).first()
    if not db_admin or not verify_password(admin.password, db_admin.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": db_admin.username})
    return {"access_token": token, "token_type": "bearer"}
