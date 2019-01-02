import { Environment } from "./Environment";
import { Scenario } from "./../scenarios/Scenario";
export class EnvironmentUtils {

    public static canPlayScenario(environment: Environment | undefined, scenario: Scenario): boolean {
        if (!environment) {
            return false;
        }
        const environmentSimulators = environment.simulators.map(simulator => simulator.name);
        environmentSimulators.push("Manager");
        const scenarioSimulators = scenario.steps.map(step => step.simulatorName);
        const set : Set<string> = new Set(scenarioSimulators);
        const intersection = environmentSimulators.filter(simulator => -1 !== scenarioSimulators.indexOf(simulator));
        return set.size === intersection.length;
    }
}