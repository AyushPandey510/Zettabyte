# backend/routers/user.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, database
from pydantic import BaseModel, EmailStr
import uuid

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

class UserCreate(BaseModel):
    name: str
    email: EmailStr

@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(database.get_db)):
    # Check if user already exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        id=str(uuid.uuid4()),
        name=user.name,
        email=user.email
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
