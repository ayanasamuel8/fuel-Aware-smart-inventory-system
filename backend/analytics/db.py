from contextlib import contextmanager
from typing import Iterator

from psycopg import Connection
from psycopg.rows import dict_row
from psycopg.sql import Identifier, SQL

from analytics.config import settings


@contextmanager
def get_connection() -> Iterator[Connection]:
    conn = Connection.connect(settings.supabase_db_url, row_factory=dict_row)
    try:
        yield conn
    finally:
        conn.close()


def fetch_telemetry_sample(limit: int) -> list[dict]:
    query = SQL(
        """
        SELECT *
        FROM {}
        ORDER BY timestamp DESC
        LIMIT %s
        """
    ).format(Identifier(settings.telemetry_table))

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query, (limit,))
            rows = cur.fetchall()

    return [dict(row) for row in rows]


def check_database_connection() -> None:
    query = SQL("SELECT 1 FROM {} LIMIT 1").format(
        Identifier(settings.telemetry_table)
    )

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query)
            cur.fetchone()
