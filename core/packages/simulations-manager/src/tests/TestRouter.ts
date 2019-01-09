import { Router, Request, Response } from "express";
import { TestExecutor } from "./TestExecutor";
import { TestPlayRequest } from "./TestPlayRequest";
import { createTest } from "./Test";
import { handleErrorAsync } from "../express/ExpressUtils";

export class TestRouter {
    static routes(): Router {
        return Router()
            .post("/test/play", handleErrorAsync(async (req: Request, res: Response) => {
                const playRequest: TestPlayRequest = req.body;

                const test = await createTest(playRequest);
                const testExecutor: TestExecutor = new TestExecutor(test);
                res.status(200).send(`Scenario ${test.scenario.name} execution started`);
                await testExecutor.execute();
            }));
    }
}