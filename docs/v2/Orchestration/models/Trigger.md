# Trigger

Trigger

This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
JobSucceededTrigger | jobSucceeded
OrTrigger | or
NewLogicTrigger | newLogic
TableUpdatedTrigger | tableUpdated
AndTrigger | and
DatasetUpdatedTrigger | datasetUpdated
ScheduleSucceededTrigger | scheduleSucceeded
MediaSetUpdatedTrigger | mediaSetUpdated
TimeTrigger | time
ManualTrigger | manual


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
