import { Router, Request, Response } from "express";
import { SimulatorConfigModel } from "../simulators/Simulator";


const simulatorsProjection = {
    _id: false
};


export class SimulatorRouter {
    static routes(): Router {
        return Router()
            .get("/simulators", async (req: Request, res: Response) => {
                const simulatorNames = await SimulatorConfigModel.find({});
                const array = simulatorNames.map(element => element.id);
                res.status(200).json(array);
            });
    }
}