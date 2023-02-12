from typing import Union

from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from db import database

app = FastAPI(
    title="GymAPI"
)

app.state.database = database


@app.on_event("startup")
async def startup() -> None:
    _database = app.state.database
    if not _database.is_connected:
        await _database.connect()
        print('Connected!')


@app.on_event("shutdown")
async def shutdown() -> None:
    _database = app.state.database
    if _database.is_connected:
        await _database.disconnect()
        print('Disconnected!')


@app.get("/", include_in_schema=False)  # Auto-redirect to Swagger (temporary)
def read_root():
    return RedirectResponse('/docs')


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
