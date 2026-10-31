from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.product import router as product_router

app = FastAPI(
    title="Subscription Management System",
    description="Backend APIs for subscription management",
    version="1.0.0"
)

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
@app.get("/")
def home():
    return {
        "success": True,
        "message": "Subscription Management Backend is running!"
    }
@app.get("/api/health")
def health_check():
    return {
        "success": True,
        "message": "API is working"
    }