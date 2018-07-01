import { Router, Request, Response } from "express";
import { Scenario, ScenarioModel } from "../models/Scenario";
import { ScenarioExecutor } from "../controllers/scenarioExecutor";

interface ScenarioPlayRequest {
    name: string;
}

export class ScenarioRouter {
    static routes(): Router {
        return Router()
            .post("/scenario/play", async (req: Request, res: Response) => {
                const playRequest: ScenarioPlayRequest = req.body;

                const scenario: Scenario = <Scenario>(await ScenarioModel.findOne({ name: playRequest.name }));
                const scenarioExecutor: ScenarioExecutor = new ScenarioExecutor(scenario);
                await scenarioExecutor.executeScenario();
                res.status(200).send(`Scenario ${scenario.name} executed sucessfully`);
            });
    }
}