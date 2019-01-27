import { Router, Request, Response } from "express";
import { Environment, EnvironmentJSON } from "ditto-shared";
import { EnvironmentModel } from "./EnvironmentMongo";
import { handleErrorAsync } from "../express/ExpressUtils";


export class EnvironmentRouter {
    static routes(): Router {
        return Router()
            .post("/environments/:id", handleErrorAsync(async (req: Request, res: Response) => {
                const environment: Environment = req.body;
                const env = await EnvironmentModel.findByIdAndUpdate(req.params.id, environment, { new: true });
                res.status(200).send(env);
            }))
            .delete("/environments/:id", handleErrorAsync(async (req: Request, res: Response) => {
                await EnvironmentModel.remove({_id : req.params.id});
                res.sendStatus(200);
            }))
            .post("/environments", handleErrorAsync(async (req: Request, res: Response) => {
                const environment: Environment = req.body;
                const newEnvironment = new EnvironmentModel(environment);
                newEnvironment.save();
                res.status(200).send(newEnvironment);

            })).get("/environments", handleErrorAsync(async (req: Request, res: Response) => {
                const environments: EnvironmentJSON[] = await EnvironmentModel.find({});
                res.status(200).json(environments);
            }));
    }
}