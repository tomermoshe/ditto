import { Router, Request, Response } from "express";
import { Scenario } from "../scenarios/Scenario";
import { Environment } from "../environments/Environment";
import { TestExecutor } from "../tests/testExecutor";
import { EnvironmentModel } from "../environments/EnvironmentMongo";
import { ScenarioModel } from "../scenarios/ScenarioMongo";

export interface ScenarioPlayRequest {
    scenarioId: string;
    environmentId: string;
}

export class TestRouter {
    static routes(): Router {
        return Router()
            .post("/test/play", async (req: Request, res: Response) => {
                const playRequest: ScenarioPlayRequest = req.body;

                const scenario: Scenario = <Scenario>(await ScenarioModel.findById(playRequest.scenarioId));
                const environment: Environment = <Environment>(await EnvironmentModel.findById(playRequest.environmentId));

                const testExecutor: TestExecutor = new TestExecutor({
                    environment: environment,
                    scenario: scenario
                });
                try {
                    res.status(200).send(`Scenario ${scenario.name} execution started`);
                    await testExecutor.execute();
                } catch (error) {
                    res.status(500).send(error);
                }

            });
    }
}