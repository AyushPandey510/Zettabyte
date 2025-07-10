# backend/main.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import events, register, admin_dashboard, admin_auth
from backend.routers import user
import backend.models as models
from backend.database import engine
from backend.config import settings
import os

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Zettabyte Hub Backend",
    description="Event Management System for Zettabyte Hub",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure absolute path to qr_codes folder
qr_codes_path = os.path.join(os.path.dirname(__file__), settings.QR_CODE_DIR)
os.makedirs(qr_codes_path, exist_ok=True)
app.mount("/qr_codes", StaticFiles(directory=qr_codes_path), name="qr_codes")

# Register routes
app.include_router(events.router, prefix="/api", tags=["Events"])
app.include_router(register.router, prefix="/api", tags=["Registration"])
app.include_router(admin_auth.router, prefix="/api", tags=["Admin Auth"])
app.include_router(admin_dashboard.router, prefix="/api", tags=["Admin Dashboard"])
app.include_router(user.router, prefix="/api", tags=["Users"])

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Zettabyte Hub Backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)