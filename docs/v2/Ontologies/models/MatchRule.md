# MatchRule

Matches intervals containing the terms in the query


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**query** | str | Yes |  |
**max_gaps** | Optional[int] | No | The maximum gaps between matched terms in the interval. For example, in the text "quick brown fox", the terms "quick" and "fox" have a gap of one. If not set, then gaps are not considered.  |
**ordered** | bool | Yes | If true, the matched terms must occur in order. |
**type** | Literal["match"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
