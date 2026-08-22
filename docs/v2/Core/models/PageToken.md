# PageToken

The page token indicates where to start paging. This should be omitted from the first page's request.
To fetch the next page, clients should take the value from the `nextPageToken` field of the previous response
and use it to populate the `pageToken` field of the next request.


## Type
```python
str
```


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
