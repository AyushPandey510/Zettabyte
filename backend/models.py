from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from backend.database import Base
from datetime import datetime
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, default="user")
    registered_at = Column(DateTime, default=datetime.utcnow)

    registrations = relationship("Registration", back_populates="user")

class Event(Base):
    __tablename__ = "events"
    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False)
    description = Column(String)
    date = Column(DateTime, nullable=False)
    max_team_size = Column(Integer, default=1)
    solo = Column(Boolean, default=True)
    created_by = Column(String, nullable=False)

    registrations = relationship("Registration", back_populates="event")

class Registration(Base):
    __tablename__ = "registrations"
    id = Column(String, primary_key=True, default=generate_uuid)
    event_id = Column(String, ForeignKey("events.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    team_name = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    qr_code = Column(String, unique=True)
    registered_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="registrations")
    event = relationship("Event", back_populates="registrations")


class Admin(Base):
    __tablename__ = "admins"
    id= Column(Integer, primary_key=True,  index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)