from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.lineup import router as lineup_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lineup_router, prefix="/api")