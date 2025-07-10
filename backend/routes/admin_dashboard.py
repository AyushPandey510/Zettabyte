# backend/routes/admin_dashboard.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.database import get_db
from backend.models import Event, Registration, User, Admin
from backend.schemas import EventCreate, EventOut, RegistrationOut, UserOut
from backend.auth.dependencies import get_current_admin
from datetime import datetime
import uuid

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

# Dashboard overview
@router.get("/dashboard")
def get_dashboard_stats(
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    total_events = db.query(Event).count()
    total_registrations = db.query(Registration).count()
    total_users = db.query(User).count()
    
    # Recent registrations
    recent_registrations = db.query(Registration).join(User).join(Event).order_by(
        Registration.registered_at.desc()
    ).limit(5).all()
    
    return {
        "message": f"Welcome, Admin {current_admin}!",
        "stats": {
            "total_events": total_events,
            "total_registrations": total_registrations,
            "total_users": total_users
        },
        "recent_registrations": [
            {
                "id": reg.id,
                "user_name": reg.user.name,
                "event_title": reg.event.title,
                "registered_at": reg.registered_at
            }
            for reg in recent_registrations
        ]
    }

# Event Management
@router.get("/events", response_model=list[EventOut])
def get_all_events(
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    return db.query(Event).all()

@router.post("/events", response_model=EventOut)
def create_event(
    event: EventCreate,
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    db_event = Event(
        id=str(uuid.uuid4()),
        title=event.title,
        description=event.description,
        date=event.date,
        max_team_size=event.max_team_size,
        solo=event.solo,
        created_by=current_admin
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.put("/events/{event_id}", response_model=EventOut)
def update_event(
    event_id: str,
    event: EventCreate,
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db_event.title = event.title
    db_event.description = event.description
    db_event.date = event.date
    db_event.max_team_size = event.max_team_size
    db_event.solo = event.solo
    
    db.commit()
    db.refresh(db_event)
    return db_event

@router.delete("/events/{event_id}")
def delete_event(
    event_id: str,
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Check if there are registrations for this event
    registrations_count = db.query(Registration).filter(Registration.event_id == event_id).count()
    if registrations_count > 0:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot delete event with {registrations_count} registrations"
        )
    
    db.delete(db_event)
    db.commit()
    return {"message": "Event deleted successfully"}

# Registration Management
@router.get("/registrations", response_model=list[RegistrationOut])
def get_all_registrations(
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    registrations = db.query(Registration).join(User).all()
    return [
        RegistrationOut(
            id=reg.id,
            user={
                "id": reg.user.id,
                "name": reg.user.name,
                "email": reg.user.email
            },
            team_name=reg.team_name,
            event_id=reg.event_id,
            qr_code=reg.qr_code
        )
        for reg in registrations
    ]

@router.get("/registrations/event/{event_id}", response_model=list[RegistrationOut])
def get_event_registrations_admin(
    event_id: str,
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    registrations = db.query(Registration).join(User).filter(
        Registration.event_id == event_id
    ).all()
    
    return [
        RegistrationOut(
            id=reg.id,
            user={
                "id": reg.user.id,
                "name": reg.user.name,
                "email": reg.user.email
            },
            team_name=reg.team_name,
            event_id=reg.event_id,
            qr_code=reg.qr_code
        )
        for reg in registrations
    ]

@router.delete("/registrations/{registration_id}")
def delete_registration(
    registration_id: str,
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    registration = db.query(Registration).filter(Registration.id == registration_id).first()
    if not registration:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    db.delete(registration)
    db.commit()
    return {"message": "Registration deleted successfully"}

# User Management
@router.get("/users", response_model=list[UserOut])
def get_all_users(
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    return db.query(User).all()

@router.get("/users/{user_id}", response_model=UserOut)
def get_user(
    user_id: str,
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Event Statistics
@router.get("/events/{event_id}/stats")
def get_event_stats(
    event_id: str,
    current_admin: str = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    registration_count = db.query(Registration).filter(Registration.event_id == event_id).count()
    
    return {
        "event": {
            "id": event.id,
            "title": event.title,
            "date": event.date,
            "max_team_size": event.max_team_size
        },
        "registrations": {
            "total": registration_count,
            "available_spots": max(0, event.max_team_size - registration_count) if event.max_team_size > 0 else "unlimited"
        }
    }