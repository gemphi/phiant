# ObjectTypeEditsHistoryResponse

Response containing the history of edits for objects of a specific object type.
Only contains object edits (create, modify, delete) - link edits are not included.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**data** | List[ObjectEditHistoryEntry] | Yes | List of historical edits for this object type |
**total_count** | Optional[int] | No | Count of items in the data array above |
**next_page_token** | Optional[str] | No | Token for retrieving the next page of results |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
