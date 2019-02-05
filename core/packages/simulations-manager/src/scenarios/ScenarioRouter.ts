import { Router, Request, Response, NextFunction } from "express";
import { Scenario } from "ditto-shared";
import { ScenarioModel } from "./ScenarioMongo";
import { handleErrorAsync } from "../express/ExpressUtils";


export class ScenarioRouter {
    static routes(): Router {
        return Router()
            .post("/scenarios/:id", handleErrorAsync(async (req: Request, res: Response) => {
                const scenario: Scenario = req.body;
                const scen = await ScenarioModel.findByIdAndUpdate(req.params.id, scenario, { new: true });
                res.status(200).send(scen);
            }))
            .delete("/scenarios/:id", handleErrorAsync(async (req: Request, res: Response) => {
                await ScenarioModel.remove({_id : req.params.id});
                res.sendStatus(200);
            }))
            .post("/scenarios", handleErrorAsync(async (req: Request, res: Response) => {
                const scenario: Scenario = req.body;

                const newScenario = new ScenarioModel(scenario);
                await newScenario.save();
                res.status(200).send(newScenario);
            }))
            .get("/scenarios", handleErrorAsync(async (req: Request, res: Response) => {
                const scenarios = await ScenarioModel.find({});
                res.status(200).json(scenarios);
            }))
            .get("/scenarios/:scenarioId", handleErrorAsync(async (req: Request, res: Response) => {
                try {
                    const scenario = await ScenarioModel.findById(req.params.scenarioId);
                    res.status(200).send(scenario);
                } catch (error) {
                    res.status(404).send(error);
                }
            }));
    }
}