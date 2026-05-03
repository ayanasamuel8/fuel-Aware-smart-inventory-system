from fastapi import FastAPI, HTTPException, Query
from psycopg import Error as PsycopgError

from analytics.config import settings
from analytics.db import check_database_connection, fetch_telemetry_sample

app = FastAPI(title=settings.app_name)


@app.on_event("startup")
def startup_checks() -> None:
    check_database_connection()


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "environment": settings.app_env,
    }


@app.get("/telemetry/sample")
def telemetry_sample(limit: int = Query(default=10, ge=1, le=100)) -> dict[str, object]:
    try:
        rows = fetch_telemetry_sample(limit)
    except PsycopgError as exc:
        raise HTTPException(status_code=500, detail=f"Database query failed: {exc}") from exc

    return {
        "table": settings.telemetry_table,
        "count": len(rows),
        "rows": rows,
    }
