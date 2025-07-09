from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend import models
from backend import schemas
import uuid

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/events", response_model=list[schemas.EventOut])
def get_events(db: Session = Depends(get_db)):
    return db.query(models.Event).all()

@router.post("/events", response_model=schemas.EventOut)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    db_event = models.Event(
        id=str(uuid.uuid4()),
        title=event.title,
        description=event.description,
        date=event.date,
        max_team_size=event.max_team_size,
        solo=event.solo,
        created_by=event.created_by
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event
