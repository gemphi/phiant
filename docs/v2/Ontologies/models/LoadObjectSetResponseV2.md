# LoadObjectSetResponseV2

Represents the API response when loading an `ObjectSet`.

## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**data** | List[OntologyObjectV2] | Yes | The list of objects in the current Page. |
**next_page_token** | Optional[PageToken] | No |  |
**total_count** | TotalCount | Yes |  |
**compute_usage** | Optional[ComputeSeconds] | No |  |
**property_securities** | Optional[List[PropertySecurities]] | No |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
