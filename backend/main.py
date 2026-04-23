from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

class Problem(BaseModel):
  text: str

@app.post("/generate-hints")
async def generate_hints(problem: Problem):
  return{
        "hint1": "Try to reduce repeated work.",
        "hint2": "Think about using a hashmap.",
        "hint3": "Aim for O(n) solution."
  }