# TextAllowedValues

The parameter value (a string) must satisfy the configured length bounds and/or regex
pattern.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**gte** | Optional[int] | No | Character length greater than or equal. |
**lte** | Optional[int] | No | Character length less than or equal. |
**regex** | Optional[str] | No | The regular expression. Format and supported syntax match Elasticsearch regex semantics. |
**configured_failure_message** | Optional[str] | No | Message returned when the value does not match the pattern. |
**type** | Literal["text"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
