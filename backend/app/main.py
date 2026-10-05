from fastapi import FastAPI
from sqlalchemy import text

from app.db.database import engine

app = FastAPI(
    title="AI Resume Intelligence & Job Matching Platform.",
    version="1.0.0"
)

@app.get("/health")
def health_check():
    return{
        "status":"healthy",
        "service":"resume-validate-api"
    }

@app.get("/health/db")
def database_health_check():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return{
        "status":"healthy",
        "database":"connected"
    }

