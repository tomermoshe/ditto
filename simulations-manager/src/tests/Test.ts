import { Scenario } from "../scenarios/Scenario.1";
import { Environment } from "../environments/Environment";

export interface Test {
    scenario: Scenario;
    environment: Environment;
}