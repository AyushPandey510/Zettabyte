from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Event Schemas
class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    date: datetime
    max_team_size: int
    solo: int
    created_by: str


class EventOut(BaseModel):
    id: str
    title: str
    description: str
    date: datetime

    class Config:
        from_attributes = True


# User Schema (for user creation only)
class UserRegister(BaseModel):
    name: str
    email: str


# User Output Schema
class UserOut(BaseModel):
    id: str
    name: str
    email: str

# Registration Schemas
class RegistrationCreate(BaseModel):
    event_id: str
    name: str                      # Required for user creation
    email: str                     # Required for user creation
    user_id: Optional[str] = None  # Optional if new user
    team_name: Optional[str] = None
    phone: Optional[str] = None
    


class RegistrationOut(BaseModel):
    id: str
    user:UserOut
    team_name: Optional[str]
    event_id: str
    qr_code: Optional[str]

    class Config:
        from_attributes = True


class AdminCreate(BaseModel):
    username: str
    password: str

class AdminLogin(BaseModel):
    username: str
    password: str