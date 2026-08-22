# ScheduleRunResult

The result of attempting to trigger the schedule. The schedule run will either be submitted as a build,
ignored if all targets are up-to-date or error.


This is a discriminator type and does not contain any fields. Instead, it is a union
of of the models listed below.

This discriminator class uses the `type` field to differentiate between classes.

| Class | Value
| ------------ | -------------
ScheduleRunIgnored | ignored
ScheduleRunSubmitted | submitted
ScheduleRunError | error


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
