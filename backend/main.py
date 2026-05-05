import json
import re
from google import genai
from pathlib import Path
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load env
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY not found")

client = genai.Client(api_key=api_key)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "API is running. Use POST /generate-hints to generate hints."}

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
    print("API HIT")
    try:
        prompt = f"""
        Given the following Data Structures and Algorithms (DSA) problem, provide exactly 3 progressive hints to help solve it.
        Return ONLY a JSON object with keys "hint1", "hint2", and "hint3". No other text or markdown formatting.
        Problem: {problem.text}
        """
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        text = response.text.strip()
        
        # Remove markdown JSON block if present
        if text.startswith("```"):
            match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', text, re.DOTALL)
            if match:
                text = match.group(1)
        
        return json.loads(text)
    except Exception as e:
        print(f"Error fetching hints: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))