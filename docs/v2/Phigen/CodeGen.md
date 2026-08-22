# CodeGen (Typed POntology Object Synthesis)

Method | HTTP Request | Release Stage |
:--- | :--- | :--- |
[**generate_types**](#generate_types) | **POST** `/v2/phigen/generate` | Stable |
[**compile_specs**](#compile_specs) | **POST** `/v2/phigen/compileSpecs` | Stable |

---

# **generate_types**

Inspects all registered 0-simplex ObjectTypes in the POntology manifold and synthesizes strongly-typed Python dataclasses with native typing annotations, dictionary serialization, and deserialization constructors.

### Parameters

| Name | Type | Description | Notes |
| :--- | :--- | :--- | :--- |
| **package_name** | `Optional[str]` | Target package output namespace (defaults to `'phiegg.ontologies.generated'`). | Optional |

| **target_types** | `Optional[List[str]]` | Filter list of specific ObjectType API names to generate. | Optional (default: all) |

### Return type

**GenerateTypesResponse** (`status`, `generated_classes_count`, `classes`, `module_code`)

### Example

```python
from phiegg import PhiEggClient
from pprint import pprint

client = PhiEggClient()

try:
    result = client.phigen.generate_types()
    print(f"Synthesized {result['count']} typed classes from POntology manifold:\n")
    for cls_info in result["classes"]:
        print(f" - Class: {cls_info['class_name']} (Primary Key: {cls_info['primary_key']})")
        for prop, p_type in cls_info["properties"].items():
            print(f"     • {prop}: {p_type}")
except Exception as e:
    print(f"PhiGen error when generating types: {e}\n")
```

### Authorization

Requires developer role with read access to the POntology complex.

### HTTP response details

| Status Code | Type | Description | Content Type |
| :--- | :--- | :--- | :--- |
| **200** | `GenerateTypesResponse` | Code generation successful. | `application/json` |
| **400** | `PhiGenError` | Invalid schema definition or unrecognized data type. | `application/json` |

[[Back to top]](#) [[Back to API list]](../../../README.md)
