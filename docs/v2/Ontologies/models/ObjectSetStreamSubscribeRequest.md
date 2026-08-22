# ObjectSetStreamSubscribeRequest

`branch` identifies the Foundry branch. `scenarioRid` identifies the Ontology Scenario.
If a scenario is based on a non-default branch, `branch` must identify that non-default base branch.


## Properties
| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
**object_set** | ObjectSet | Yes |  |
**branch** | Optional[FoundryBranch] | No |  |
**scenario_rid** | Optional[OntologyScenarioRid] | No |  |
**property_set** | List[SelectedPropertyApiName] | Yes |  |
**reference_set** | List[SelectedPropertyApiName] | Yes |  |
**object_loading_response_options** | Optional[ObjectLoadingResponseOptions] | No |  |


[[Back to Model list]](./models/README.md) [[Back to API list]](../README.md) [[Back to README]](../../README.md)
