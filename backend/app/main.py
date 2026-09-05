from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth import router as auth_router
from app.routers.trip import router as trip_router

app = FastAPI(
    title="SafarSaathi API",
    description="AI-Powered Autonomous Travel Assistant",
    version="1.0.0"
)

# CORS: allow Vite frontend (http://localhost:5173) to send JWT + preflight OPTIONS
# Without this, browser preflight OPTIONS /health, /api/auth/me etc return 405
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(trip_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to SafarSaathi API",
        "status": "running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }