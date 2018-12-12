import { Router, Request, Response } from "express";
import { Environment, EnvironmentJSON } from "ditto-shared";
import { EnvironmentModel } from "./EnvironmentMongo";


export class EnvironmentRouter {
    static routes(): Router {
        return Router()
            .post("/environments", async (req: Request, res: Response) => {
                const environment: Environment = req.body;
                const newEnvironment = new EnvironmentModel(environment);
                try {
                    newEnvironment.save();
                    res.status(200).send(newEnvironment);
                } catch (e) {
                    res.status(500).send(e);
                }
            }).get("/environments", async (req: Request, res: Response) => {
                const environments: EnvironmentJSON[] = await EnvironmentModel.find({});
                res.status(200).json(environments);
            });
    }
}