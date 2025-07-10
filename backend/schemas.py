# backend/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User Schemas
class UserOut(BaseModel):
    id: str
    name: str
    email: str

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    name: str
    email: EmailStr

# Event Schemas
class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    date: datetime
    max_team_size: int = 1
    solo: bool = True  # Changed from int to bool
    created_by: str

class EventOut(BaseModel):
    id: str
    title: str
    description: Optional[str]
    date: datetime
    max_team_size: int
    solo: bool
    created_by: str

    class Config:
        from_attributes = True

# Registration Schemas
class RegistrationCreate(BaseModel):
    event_id: str
    name: str
    email: EmailStr
    user_id: Optional[str] = None
    team_name: Optional[str] = None
    phone: Optional[str] = None

class RegistrationOut(BaseModel):
    id: str
    user: UserOut
    team_name: Optional[str]
    event_id: str
    qr_code: Optional[str]

    class Config:
        from_attributes = True

# Admin Schemas
class AdminCreate(BaseModel):
    username: str
    password: str

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminOut(BaseModel):
    id: int
    username: str
    
    class Config:
        from_attributes = True