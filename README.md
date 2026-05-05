# DSA Hint Generator

DSA Hint Generator is a full-stack web application designed to help developers and students practice Data Structures and Algorithms (DSA). Instead of giving you the direct solution to a problem, it uses AI to generate **three progressive hints**. This guides you towards solving the problem on your own, enhancing your learning experience!

## 🚀 Tech Stack

- **Frontend:** React, Vite
- **Backend:** FastAPI, Python, Uvicorn
- **AI Integration:** Google Gemini API (`gemini-2.5-flash` model)

## ✨ Features

- **Problem Input:** Simply paste any DSA problem description into the text area.
- **Progressive Hints:** Uses Gemini to analyze the problem and provide 3 hints:
  - *Hint 1:* Usually a gentle nudge or a suggestion on the approach/data structure.
  - *Hint 2:* A more detailed step or algorithm structure.
  - *Hint 3:* A very strong clue close to the final logic, without spoiling the code.
- **Fast & Responsive:** Built with Vite and FastAPI for blazing fast performance.

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- Python 3.8+
- A Google Gemini API Key

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd "DSA HINT"
```

### 2. Backend Setup
Navigate to the backend directory and install the dependencies:
```bash
cd backend

# Create a virtual environment (optional but recommended)
python -m venv .venv

# Activate the virtual environment (Windows)
.venv\Scripts\activate

# Install required packages (FastAPI, uvicorn, google-genai, python-dotenv, etc.)
pip install fastapi uvicorn pydantic python-dotenv google-genai
```

**Configure Environment Variables:**
Create a `.env` file in the `backend` directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

**Run the Backend Server:**
```bash
python -m uvicorn main:app --reload
```
*The backend will run at `http://127.0.0.1:8000`*

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend/frontend

# Install Node modules
npm install

# Start the Vite development server
npm run dev
```
*The frontend will typically run at `http://localhost:5173`*

## 💡 Usage

1. Open your browser and go to the frontend URL.
2. Paste a LeetCode, HackerRank, or any custom DSA problem into the text box.
3. Click **"Generate Hints"**.
4. Read the hints progressively to guide your thought process!

## 🔒 Security
- `.env` files are added to `.gitignore` to prevent leaking API keys to version control.
- Ensure you never commit your `GEMINI_API_KEY` to GitHub.

---
*Happy Coding!*
