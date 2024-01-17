from globals import *
from helpers import *
from settings import settings

from typing import Annotated
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

queue = []

@app.get("/")
def about():
    return {"message": "00dg"}

@app.get("/api/goals")
def get_goals():
    return settings

@app.post("/api/delete")
def delete(price:Annotated[str, Form()]):
    queue.append({"command": "delete", "value": price})
    return queue

@app.get("/api/queue")
def get_queue():
    if len(queue) > 0:
        return queue.pop(0)
    else:
        return {"command": "none", "value": ""}