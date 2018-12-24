import { Environment } from "./Environment";
import { Scenario } from "./../scenarios/Scenario";
export class EnvironmentUtils {

    public static canPlayScenario(environment: Environment | undefined, scenario: Scenario): boolean {
        if (!environment) {
            return false;
        }
        const environmentSimulators = environment.simulators.map(simulator => simulator.name);
        const scenarioSimulators = scenario.steps.map(step => step.simulatorName);
        const intersection = environmentSimulators.filter(simulator => -1 !== scenarioSimulators.indexOf(simulator));
        return environmentSimulators.length === intersection.length;
    }
}