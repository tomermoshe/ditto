import { Router, Request, Response } from "express";
import { SimulatorDefinitionModel } from "../simulators/SimulatorDefinitionMongo";
import { UploadedFile } from "express-fileupload";
import uniqid from "uniqid";

const simulatorsProjection = {
    _id: false
};


export class SimulatorRouter {
    static routes(): Router {
        return Router()
            .get("/simulators", async (req: Request, res: Response) => {
                const simulators = await SimulatorDefinitionModel.find({}, "-_id");
                res.status(200).json(simulators);
            }).post("/simulators/upload", async (req: Request, res: Response) => {
                try {
                    const simulatorFile: UploadedFile = <UploadedFile>req.files.file;
                    // if(simulatorFile.name.split(".")[1]!=="tar"){

                    // }
                    await simulatorFile.mv(`${__dirname}/uploads/${simulatorFile.name}`);
                    res.status(200);
                }
                catch (e) {
                    res.status(500).json(e);
                }

            });
    }
}