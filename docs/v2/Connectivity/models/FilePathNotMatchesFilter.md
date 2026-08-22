# FilePathNotMatchesFilter

Only import files whose path (relative to the root of the source) does not match the regular expression.

**Example**
Suppose we are importing files from `relative/subfolder`.
`relative/subfolder` contains:
- `relative/subfolder/include-file.txt`
- `relative/subfolder/exclude-file.txt`
- `relative/subfolder/other-file.txt`

With the `relative/subfolder/exclude-.*.txt` regex, both `relative/subfolder/include-file.txt` and `relative/subfolder/other-file.txt` will be imported,
and `relative/subfolder/exclude-file.txt` will be excluded from the import.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**regex** | str | Yes | Must be written to match the paths relative to the root of the source, even if a subfolder is specified.  |
**type** | Literal["pathNotMatchesFilter"] | Yes | None |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
