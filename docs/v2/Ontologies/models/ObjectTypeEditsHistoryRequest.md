# ObjectTypeEditsHistoryRequest

Request object for querying object type edits history, containing both filters and pagination parameters

If objectPrimaryKey property is set, the method will return edits history for the particular object.
Otherwise, the method will return edits history for all objects of this object type.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**object_primary_key** | Optional[ObjectPrimaryKeyV2] | No |  |
**filters** | Optional[EditsHistoryFilter] | No |  |
**sort_order** | Optional[EditsHistorySortOrder] | No |  |
**include_all_previous_properties** | Optional[bool] | No |  |
**page_size** | Optional[int] | No | The maximum number of edits to return per page. Defaults to 100. |
**page_token** | Optional[str] | No | Token for retrieving the next page of results |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
