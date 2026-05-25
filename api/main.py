from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import coach, session

app = FastAPI(title="Blackjack AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(coach.router, prefix="/api")
app.include_router(session.router, prefix="/api")
