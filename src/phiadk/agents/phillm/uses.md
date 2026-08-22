# PhiLLM Code Examples & Usage Guide (`uses.md`)

This guide shows practical Python SDK code examples for **PhiLLM** (Multi-Provider Language Model Gateway).

---

## 1. Unified Multi-Provider Text Generation

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Generate completions with OpenAI, Anthropic, or Gemini through one API
completion = client.phillm.generate(
    prompt="Explain simplicial complexes in 2 concise sentences.",
    model="gemini-1.5-pro",  # or "gpt-4o", "claude-3-5-sonnet"
    temperature=0.2,
    max_tokens=200
)

print("Generated Text:", completion.text)
print("Token Usage:", completion.usage)
```

---

## 2. Server-Sent Events (SSE) Streaming Response

```python
from phiadk import PhiADKClient

client = PhiADKClient()

# Stream response tokens chunk by chunk
stream = client.phillm.stream(
    prompt="Draft an employee promotion recommendation letter.",
    model="claude-3-5-sonnet"
)

for chunk in stream:
    print(chunk.delta, end="", flush=True)
print("\n[Stream Finished]")
```

---

## 3. Structured JSON Output & Function Calling

```python
from phiadk import PhiADKClient

client = PhiADKClient()

schema = {
    "type": "object",
    "properties": {
        "summary": {"type": "string"},
        "priority": {"type": "string", "enum": ["LOW", "MEDIUM", "HIGH", "URGENT"]},
        "action_required": {"type": "boolean"}
    },
    "required": ["summary", "priority", "action_required"]
}

result = client.phillm.generate_structured(
    prompt="Review server crash log: out of memory on worker node 4.",
    response_schema=schema
)

print("Parsed JSON Result:", result.data)
```
