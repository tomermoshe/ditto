import { Router, Request, Response } from "express";
import { TestExecutor } from "../tests/testExecutor";
import { TestPlayRequest } from "./testPlayRequest";
import { createTest } from "./Test";

export class TestRouter {
    static routes(): Router {
        return Router()
            .post("/test/play", async (req: Request, res: Response) => {
                const playRequest: TestPlayRequest = req.body;

                const test = await createTest(playRequest);
                const testExecutor: TestExecutor = new TestExecutor(test);
                try {
                    res.status(200).send(`Scenario ${test.scenario.name} execution started`);
                    await testExecutor.execute();
                } catch (error) {
                    res.status(500).send(error);
                }

            });
    }
}