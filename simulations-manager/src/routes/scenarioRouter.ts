import { Router, Request, Response } from "express";
import { Scenario, scenarioModel } from "../models/Scenario";
import { ScenarioExecutor } from "../controllers/scenarioExecutor";

interface ScenarioPlayRequest {
    name: string
}

export class ScenarioRouter {
    static routes(): Router {
        return Router()
            .post("/scenario/play", async (req: Request, res: Response) => {
                let playRequest: ScenarioPlayRequest = req.body;

                let scenario: Scenario = <Scenario>(await scenarioModel.findOne({ name: playRequest.name }));
                let scenarioExecutor: ScenarioExecutor = new ScenarioExecutor(scenario);
                await scenarioExecutor.executeScenario();
                res.status(200).send(`Scenario ${scenario.name} executed sucessfully`);
            });
    }
}