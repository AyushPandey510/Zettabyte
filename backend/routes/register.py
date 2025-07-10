# backend/routes/register.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models import Registration, Event, User
from backend.schemas import RegistrationCreate, RegistrationOut
import uuid, os
import qrcode

router = APIRouter()

@router.post("/register", response_model=RegistrationOut)
def register_user(data: RegistrationCreate, db: Session = Depends(get_db)):
    # Check event
    event = db.query(Event).filter(Event.id == data.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Check if user exists
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        user = User(
            id=data.user_id if data.user_id else str(uuid.uuid4()), 
            name=data.name, 
            email=data.email
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    # Check if user already registered for this event
    existing_registration = db.query(Registration).filter(
        Registration.user_id == user.id,
        Registration.event_id == data.event_id
    ).first()
    
    if existing_registration:
        raise HTTPException(status_code=400, detail="User already registered for this event")

    reg_id = str(uuid.uuid4())

    # Generate QR code
    qr_data = f"Registration ID: {reg_id}\nName: {data.name}\nEvent: {event.title}"
    img = qrcode.make(qr_data)

    # Save QR code image
    qr_dir = os.path.join(os.path.dirname(__file__), "..", "qr_codes")
    os.makedirs(qr_dir, exist_ok=True)
    qr_filename = f"{reg_id}.png"
    qr_path = os.path.join(qr_dir, qr_filename)
    img.save(qr_path)

    # Create Registration
    registration = Registration(
        id=reg_id,
        user_id=user.id,
        event_id=data.event_id,
        team_name=data.team_name,
        phone=data.phone,
        qr_code=f"/qr_codes/{qr_filename}"  # Store URL path
    )

    db.add(registration)
    db.commit()
    db.refresh(registration)

    # Return response with user data
    return RegistrationOut(
        id=registration.id,
        user={
            "id": user.id,
            "name": user.name,
            "email": user.email
        },
        team_name=registration.team_name,
        event_id=registration.event_id,
        qr_code=registration.qr_code
    )

@router.get("/registrations/{event_id}", response_model=list[RegistrationOut])
def get_event_registrations(event_id: str, db: Session = Depends(get_db)):
    registrations = db.query(Registration).join(User).filter(
        Registration.event_id == event_id
    ).all()
    
    if not registrations:
        raise HTTPException(status_code=404, detail="No registrations found for this event")

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

@router.get("/registrations/user/{user_id}", response_model=list[RegistrationOut])
def get_user_registrations(user_id: str, db: Session = Depends(get_db)):
    registrations = db.query(Registration).join(User).filter(
        Registration.user_id == user_id
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