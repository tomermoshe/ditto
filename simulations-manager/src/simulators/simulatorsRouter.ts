import { Router, Request, Response } from "express";
import { SimulatorDefinitionModel } from "../simulators/SimulatorDefinitionMongo";
import { UploadedFile } from "express-fileupload";




export class SimulatorRouter {
    static routes(): Router {
        return Router()
            .get("/simulators", async (req: Request, res: Response) => {
                const simulators = await SimulatorDefinitionModel.find({}, "-_id");
                res.status(200).json(simulators);
            }).post("/simulators/upload", async (req: Request, res: Response) => {
                try {
                    const simulatorFile: UploadedFile = <UploadedFile>req.files.file;

                    const temp = simulatorFile.name.split(".");
                    if (temp[temp.length - 1] !== "tar") {
                        throw ("Please provide tar file");
                    }
                    await simulatorFile.mv(`${__dirname}/uploads/${simulatorFile.name}`);
                    res.status(200).send();
                }
                catch (e) {
                    res.status(500).send(e);
                }

            });
    }
}