# PhiLLM Formal Specification (`spec.md`)

- **Agent ID**: `phillm`
- **Agent Name**: `PhiLLM`
- **Domain**: `model_access`
- **Layer**: `AgentLayer.ENGINE`
- **Version**: `1.0.0`

---

## 1. Supported Verbs (`PhiLLMVerb`)

| Verb Enum | Action String | Parameters | Returns | Morphism Description |
| :--- | :--- | :--- | :--- | :--- |
| `COMPLETE` | `"complete"` | `{"prompt": str, "model": Optional[str]}` | `ChatCompletionResponse` | Chat / text generation morphism. |
| `EMBED` | `"embed"` | `{"text": str, "model": Optional[str]}` | `{"embeddings": List}` | Dense vector embedding extraction. |
| `COUNT_TOKENS` | `"count_tokens"` | `{"text": str}` | `{"tokens": int}` | Token length estimator. |
| `GET_CONFIG` | `"get_config"` | `{}` | `ModelConfig` dict | Current active provider & parameters. |
| `SET_PARAMS` | `"set_params"` | `{"model": str, "temperature": float}` | `{"status": "updated"}` | Mutate runtime model hyperparameters. |
| `GET_USAGE` | `"get_usage"` | `{}` | `{"total_tokens": int}` | Token usage ledger. |

---

## 2. Supported Tasks (`PhiLLMTask`)

- `INFERENCE` (`"inference"`)
- `CONFIGURATION` (`"configuration"`)
- `ENDPOINT_HEALTH` (`"endpoint_health"`)

---

## 3. Specifications (`PhiLLMSpec`)

- `LLM_MODEL_ACCESS_V1` (`"LLM_MODEL_ACCESS_V1"`)
