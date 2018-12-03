import { Scenario } from "../scenarios/Scenario";
import { Environment } from "../environments/Environment";
import { TestPlayRequest } from "./TestPlayRequest";
import { ScenarioModel } from "../scenarios/ScenarioMongo";
import { EnvironmentModel } from "../environments/EnvironmentMongo";

export interface Test {
    scenario: Scenario;
    environment: Environment;
}

export const createTest = async (request: TestPlayRequest): Promise<Test> => {
    const scenario: Scenario = <Scenario>(await ScenarioModel.findById(request.scenarioId));
    const environment: Environment = <Environment>(await EnvironmentModel.findById(request.environmentId));

    return { scenario , environment };
};