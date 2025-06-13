# Digital Detox Companion: AI Backend Service

This is a simple FastAPI backend that provides an AI chat API endpoint for the Digital Detox Companion app.

## Features

- **POST `/api/ai-chat`**: Accepts a user's message and returns an AI-generated assistant response in the format:
  ```json
  { "assistant": "<AI reply string>" }
  ```
- If an [OpenAI API key](https://platform.openai.com/account/api-keys) is provided via environment variable (`OPENAI_API_KEY`), responses will be generated using OpenAI GPT-3.5-turbo via the official OpenAI Python SDK.
- If no API key is set (or the SDK is not installed), a mock (randomized generic) assistant reply is returned.
- Graceful error handling if the OpenAI API request fails (returns `502` status with suitable error message).
- CORS enabled for all origins (local frontend compatible).

---

## Environment Variable: `OPENAI_API_KEY`

To use real OpenAI completions, set the `OPENAI_API_KEY` environment variable before starting the backend.  
If this key is absent (or the SDK is missing), the backend serves mock replies.

**How to set in Unix/macOS/Linux (`bash`):**
```bash
export OPENAI_API_KEY=sk-...
```

**How to set in Windows (cmd):**
```cmd
set OPENAI_API_KEY=sk-...
```

### Where the key is used:

- The backend loads the key at process start.
- When present, user chat requests are passed to OpenAI's Chat Completions API.
- The key is never logged or exposed to the frontend.

---

## Getting Started

### 1. Install Dependencies

> Requires Python 3.8+.  
> The OpenAI SDK (`openai`) must be installed (see `requirements.txt`).

```bash
cd ai_backend
pip install -r requirements.txt
```

### 2. Set API Key (Optional)

Set `OPENAI_API_KEY` as described above.

If the variable is omitted, the backend will respond with mock assistant replies.  
If provided but OpenAI SDK is not installed, a warning is logged and mock mode is used.

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

### Error Handling

If the OpenAI API call fails or is unavailable, the endpoint returns a `502 Bad Gateway` error:
```json
{ "detail": "AI service unavailable, please try again later." }
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

- To change the OpenAI model or handling logic, edit `main.py`.
- CORS is enabled for all origins, so it is compatible with your React frontend.
- The backend supports both asynchronous and synchronous OpenAI SDK versions.

- **Security:** Never commit your OpenAI API key to public code or share it with clients/frontends. The key is used server-side only.
