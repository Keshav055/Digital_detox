import os
import random
import logging
from typing import Optional

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

try:
    import openai
    openai_available = True
except ImportError:
    openai_available = False

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ai_backend")

# PUBLIC_INTERFACE
class ChatRequest(BaseModel):
    """Request payload for AI chat endpoint."""
    message: str

# PUBLIC_INTERFACE
class ChatResponse(BaseModel):
    """Response payload containing the assistant's reply."""
    assistant: str

# Create FastAPI app
app = FastAPI(
    title="Digital Detox Companion AI Backend",
    description="FastAPI server providing /api/ai-chat backed by OpenAI (if configured)."
)

# Enable CORS for all origins (required for local frontend dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load OpenAI API key from environment variable
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

if OPENAI_API_KEY and openai_available:
    openai.api_key = OPENAI_API_KEY
    logger.info("OpenAI API key loaded successfully from environment variable.")
elif not openai_available and OPENAI_API_KEY:
    logger.warning("OpenAI API key provided, but openai Python SDK not installed.")
else:
    logger.info("No OpenAI API key found. Will use mock mode.")

# PUBLIC_INTERFACE
@app.post("/api/ai-chat", response_model=ChatResponse)
async def ai_chat(chat_req: ChatRequest, request: Request):
    """
    Endpoint for AI assistant chat.

    Receives a user message and responds with an assistant reply. If an OpenAI API key
    is set in the `OPENAI_API_KEY` environment variable, uses the OpenAI Chat API
    to generate completions. Otherwise, returns a randomized mock reply.
    Handles API errors gracefully.

    Request body:
      { "message": "<user's message>" }
    Returns:
      { "assistant": "<AI reply string>" }
    """
    user_message = chat_req.message or ""

    # If OpenAI API is set up, call the real model
    if OPENAI_API_KEY and openai_available:
        try:
            response = await call_openai_chat(user_message)
            return ChatResponse(assistant=response)
        except Exception as e:
            logger.error(f"OpenAI API call failed: {e}", exc_info=True)
            raise HTTPException(status_code=502, detail="AI service unavailable, please try again later.")
    else:
        # Return a randomized mock/dummy reply
        mock_replies = [
            "Reflecting on your digital journey is a great way to grow! 🌱",
            "That's interesting! What triggered your urge to check your device?",
            "Great insight! Have you considered setting a purposeful offline goal?",
            "Mindful changes lead to lasting habits. How did it feel to disconnect?",
            "Each small step offline counts—keep it up! 💪",
            "Would you like a tip to stay focused next time?"
        ]
        return ChatResponse(assistant=random.choice(mock_replies))

# PUBLIC_INTERFACE
async def call_openai_chat(user_message: str) -> str:
    """
    Calls OpenAI's Chat Completions API and returns the assistant's reply.
    """
    # Use GPT-3.5-turbo by default
    model = "gpt-3.5-turbo"
    try:
        completion = await _openai_chat_async(
            messages=[{"role": "user", "content": user_message}],
            model=model,
            temperature=0.7
        )
    except Exception as e:
        logger.error(f"Error communicating with OpenAI API: {e}", exc_info=True)
        raise
    # Retrieve the message content from the OpenAI response
    assistant_message = (
        completion.choices[0].message.content
        if hasattr(completion, "choices") and len(completion.choices) > 0
        else "Sorry, I couldn't generate a response at this time."
    )
    return assistant_message

async def _openai_chat_async(messages, model, temperature=0.7):
    """
    INTERNAL:
    Helper to call OpenAI's async ChatCompletion endpoint, falling back to sync if needed.
    """
    if hasattr(openai.ChatCompletion, "acreate"):
        # Use async method if available (openai >=0.27)
        return await openai.ChatCompletion.acreate(
            model=model,
            messages=messages,
            temperature=temperature,
            timeout=15,
        )
    else:
        # Fallback to synchronous method in thread
        import asyncio
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(
            None,
            lambda: openai.ChatCompletion.create(
                model=model,
                messages=messages,
                temperature=temperature,
                timeout=15,
            )
        )
