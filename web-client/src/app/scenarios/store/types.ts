import { ScenarioJSON } from "../../../../../simulations-manager/src/scenarios/Scenario";

export const enum ScenariosActionTypes {
  SCENARIO_CREATION_SUCCEEDED = "SCENARIO_CREATION_SUCCEEDED",
  SCENARIO_CREATION_STARTED = "SCENARIO_CREATION_STARTED",
  SCENARIO_CREATION_FAILED = "SCENARIO_CREATION_FAILED",
  RECIEVE_SCENARIOS = "RECIEVE_SCENARIOS"
}

export interface ScenariosState{
    readonly all : ScenarioJSON[];
}