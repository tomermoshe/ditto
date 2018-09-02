import { Scenario } from "../scenarios/Scenario";
import { Environment } from "../environments/Environment";

export interface Test {
    scenario: Scenario;
    environment: Environment;
}