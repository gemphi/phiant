# DevModeSnapshot

A content-addressed snapshot of the dev mode settings. Snapshots are immutable
and identified by their content-addressed ID.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**snapshot_id** | DevModeSnapshotId | Yes | The content-addressed identifier for this snapshot. |
**widget_set_settings** | Dict[WidgetSetRid, WidgetSetDevModeSettingsV2] | Yes | The dev mode settings for each widget set, keyed by widget set RID.  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
