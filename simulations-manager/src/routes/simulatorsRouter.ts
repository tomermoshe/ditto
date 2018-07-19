import { Router, Request, Response } from "express";
import { SimulatorConfigModel } from "../simulators/Simulator";


const simulatorsProjection = {
    _id: false
};


export class SimulatorRouter {
    static routes(): Router {
        return Router()
            .get("/simulators/names", async (req: Request, res: Response) => {
                const simulatorNames = await SimulatorConfigModel.find({}).select("id.imageName");
                const array = simulatorNames.map(element => element.id.imageName);
                const set = new Set(array);
                res.status(200).json([...set]);
            });
    }
}