import { Test } from "./Test";
import { EnvironmentExecutor } from "../environments/EnvironmentExecutor";
import uniqid from "uniqid";
import { ScenarioExecutor } from "../scenarios/ScenarioExecutor";
import { EventEmitter } from "events";

export class TestExecutor extends EventEmitter {
    scenarioExecutor: ScenarioExecutor;
    executionId: string;
    environmentExecutor: EnvironmentExecutor;
    test: Test;

    constructor(test: Test) {
        super();
        this.test = test;
        this.executionId = uniqid();
    }
    public async execute() {
        this.environmentExecutor = new EnvironmentExecutor(this, this.test.environment, this.executionId);
        this.scenarioExecutor = new ScenarioExecutor(this, this.test.scenario, this.executionId);
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