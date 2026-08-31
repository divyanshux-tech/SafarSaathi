from fastapi import FastAPI

from app.routers.auth import router as auth_router

app = FastAPI(
    title="SafarSaathi API",
    description="AI-Powered Autonomous Travel Assistant",
    version="1.0.0"
)

app.include_router(auth_router)

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