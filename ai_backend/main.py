import os
import random

from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

try:
    import openai
except ImportError:
    openai = None  # gracefully degrade if openai is not installed


# PUBLIC_INTERFACE
class AIChatRequest(BaseModel):
    """Request body for AI chat endpoint."""
    message: str


# PUBLIC_INTERFACE
class AIChatResponse(BaseModel):
    """Response format for AI chat endpoint."""
    assistant: str


app = FastAPI(
    title="Digital Detox AI Chat Backend",
    description="AI chat service for Digital Detox Companion.",
    version="0.1.0",
)

# Allow frontend on localhost or any domain (adjust for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # To restrict, change this to frontend's origin.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# PUBLIC_INTERFACE
@app.post("/api/ai-chat", response_model=AIChatResponse)
async def ai_chat(request: AIChatRequest):
    """
    AI chat endpoint. Accepts a user message (POST body: { "message": "..." }),
    returns { "assistant": "<AI reply string>" }.
    Uses OpenAI API if API key is set, otherwise returns a mock reply.
    """
    # Validate user input (should not be empty)
    user_message = (request.message or "").strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    if OPENAI_API_KEY and openai:
        try:
            openai.api_key = OPENAI_API_KEY
            completion = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a supportive digital wellbeing assistant helping users make healthier tech choices."},
                    {"role": "user", "content": user_message}
                ],
                max_tokens=220,
                n=1,
                temperature=0.7
            )
            assistant_message = completion.choices[0].message["content"].strip()
        except Exception as e:
            # If OpenAI fails, fallback to mock message
            assistant_message = f"Sorry, the AI service is temporarily unavailable. (Error: {e})"
    else:
        # Fallback: Return a mock demo message
        assistant_message = random.choice([
            "Taking regular breaks helps you feel more refreshed. Try a walk outdoors today!",
            "Congrats on being mindful about your digital habits! What's one offline goal for this week?",
            "Turn off notifications for an hour and give yourself some focused, quiet time.",
            "Remember: Small steps add up, and you’re making real progress.",
            "Try an off-grid hour tonight and jot down how you felt afterwards."
        ])

    return AIChatResponse(assistant=assistant_message)
