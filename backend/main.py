from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from backend.routes import events, register
from backend.routes import admin_dashboard, admin_auth
import backend.models as models
from backend.database import engine
import os
from backend.routers import user
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Zettabyte Hub Backend")

# Ensure absolute path to qr_codes folder
qr_codes_path = os.path.join(os.path.dirname(__file__), "qr_codes")
app.mount("/qr_codes", StaticFiles(directory=qr_codes_path), name="qr_codes")

# Register routes
app.include_router(events.router)
app.include_router(register.router)
app.include_router(admin_auth.router)
app.include_router(admin_dashboard.router)
app.include_router(user.router)
