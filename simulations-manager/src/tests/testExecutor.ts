import { Test } from "./Test";
import { EnvironmentExecutor } from "../environments/environmentExecutor";
import uniqid from "uniqid";
import { ScenarioExecutor } from "../scenarios/scenarioExecutor.1";

class TestExecutor {
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

        this.environmentExecutor.executeEnironment();
        this.scenarioExecutor.executeScenario();
        this.environmentExecutor.removeEnvironment();
    }
}