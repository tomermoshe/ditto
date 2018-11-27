import { Test } from "./Test";
import { EnvironmentExecutor } from "../environments/environmentExecutor";
import uniqid from "uniqid";
import { ScenarioExecutor } from "../scenarios/scenarioExecutor";

export class TestExecutor {
    scenarioExecutor: ScenarioExecutor;
    executionId: string;
    environmentExecutor: EnvironmentExecutor;
    test: Test;

    constructor(test: Test) {
        this.test = test;
        this.executionId = uniqid();
    }
    public async execute() {
        this.environmentExecutor = new EnvironmentExecutor(this.test.environment, this.executionId);
        this.scenarioExecutor = new ScenarioExecutor(this.test.scenario, this.executionId);
        try {
            await this.environmentExecutor.executeEnvironment();
            await this.scenarioExecutor.executeScenario();
        } catch (error) {
            console.log(error);
            throw new Error(error);
        } finally {
            await this.environmentExecutor.removeEnvironment();
        }

    }
}