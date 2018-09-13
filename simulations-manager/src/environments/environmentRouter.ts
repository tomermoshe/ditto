import { Router, Request, Response } from "express";
import { Environment, EnvironmentModel } from "../environments/Environment";


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
            });
    }
}