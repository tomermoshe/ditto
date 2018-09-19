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

                    const temp = simulatorFile.name.split(".");
                    if (temp[temp.length - 1] !== "tar") {
                        throw ("Please provide tar file");
                    }
                    const id = uniqid();
                    await simulatorFile.mv(`${__dirname}/uploads/${id}.tar`);
                    res.status(200).send(id);
                }
                catch (e) {
                    res.status(500).send(e);
                }

            });
    }
}