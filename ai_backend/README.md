# Digital Detox Companion: AI Backend Service

This is a simple FastAPI backend that provides an AI chat API endpoint for the Digital Detox Companion app.

## Features

- **POST `/api/ai-chat`**: Accepts a user's message and returns an AI-generated assistant response in the format:
  ```json
  { "assistant": "<AI reply string>" }
  ```
- If an [OpenAI API key](https://platform.openai.com/account/api-keys) is provided via environment variable (`OPENAI_API_KEY`), responses will be generated using OpenAI GPT-3.5-turbo.
- If no API key is set, a mock (randomized generic) assistant reply is returned.

---

## Getting Started

### 1. Install Dependencies

> Requires Python 3.8+.

```bash
cd ai_backend
pip install -r requirements.txt
```

### 2. Set API Key (Optional)

To use the real OpenAI model, set your API key in an environment variable:

```bash
export OPENAI_API_KEY=sk-...
```

If omitted, the backend will respond with mock assistant replies.

### 3. Run the Server

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Server will listen on **http://localhost:8000** by default.

---

## API Usage

### POST `/api/ai-chat`

**Request JSON:**
```json
{ "message": "<user's message>" }
```

**Response JSON:**
```json
{ "assistant": "<AI reply string>" }
```

---

## Example with `curl`

```bash
curl -X POST http://localhost:8000/api/ai-chat \
     -H "Content-Type: application/json" \
     -d '{"message": "How do I improve my digital habits?"}'
```

---

## Notes

- To change the OpenAI model or add your logic, edit `main.py`.
- CORS is enabled for all origins, so it is compatible with your React frontend.
