import { Router, Request, Response } from "express";
import { Scenario, ScenarioModel } from "../scenarios/Scenario";
import { ScenarioExecutor } from "../scenarios/scenarioExecutor";
import { Environment, EnvironmentModel } from "../environments/Environment";
import { TestExecutor } from "../tests/testExecutor";

interface ScenarioPlayRequest {
    scenarioName: string;
    environmentName: string;
}

export class ScenarioRouter {
    static routes(): Router {
        return Router()
            .post("/test/play", async (req: Request, res: Response) => {
                const playRequest: ScenarioPlayRequest = req.body;

                const scenario: Scenario = <Scenario>(await ScenarioModel.findOne({ name: playRequest.scenarioName }));
                const environment: Environment = <Environment>(await EnvironmentModel.findOne({ name: playRequest.environmentName }));

                const testExecutor: TestExecutor = new TestExecutor({
                    environment: environment,
                    scenario: scenario
                });
                await testExecutor.execute();
                res.status(200).send(`Scenario ${scenario.name} executed sucessfully`);
            });
    }
}