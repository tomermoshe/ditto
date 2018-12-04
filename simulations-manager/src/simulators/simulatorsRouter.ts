import { Router, Request, Response } from "express";
import { SimulatorDefinitionModel } from "../simulators/SimulatorDefinitionMongo";
import { UploadedFile } from "express-fileupload";
import { SimulatorDefinition } from "./simulatorDefinition";
import { dockerode } from "../connectors/dockerodeConnector";
import fs from "fs";
import localSimulatorDefinition from "./localSimulatorDefinition";

const UPLOADS_DIR = `${__dirname}/uploads`;
const IMAGES_DIR = `${__dirname}/images`;


export class SimulatorRouter {


    static routes(): Router {
        return Router()
            .get("/simulators", async (req: Request, res: Response) => {
                const simulators: SimulatorDefinition[] = await SimulatorDefinitionModel.find({}, "-_id");
                simulators.push(localSimulatorDefinition);
                res.status(200).json(simulators);
            }).post("/simulators/upload", async (req: Request, res: Response) => {
                try {
                    const simulatorFile: UploadedFile = <UploadedFile>req.files.file;
                    const uploadId = req.body.uploadId;
                    const temp = simulatorFile.name.split(".");
                    if (temp[temp.length - 1] !== "tar") {
                        throw ("Please provide tar file");
                    }
                    await simulatorFile.mv(`${UPLOADS_DIR}/${uploadId}.tar`);
                    res.status(200).send();
                }
                catch (e) {
                    res.status(500).send(e);
                }
            }).post("/simulators", async (req: Request, res: Response) => {
                try {
                    const simulatorDefinition: SimulatorDefinition = req.body.simulator as SimulatorDefinition;
                    const uploadId: string = req.body.uploadId;
                    const newSimulatorDefinition = new SimulatorDefinitionModel(simulatorDefinition);

                    const simulatorFilePath = `${UPLOADS_DIR}/${uploadId}.tar`;
                    const readStream = await dockerode.buildImage(simulatorFilePath,
                        {
                            t: `${simulatorDefinition.id.imageName}:${simulatorDefinition.id.version}`
                        });
                    // const writeStream = fs.createWriteStream(`${IMAGES_DIR}/${simulatorDefinition.id.imageName}_${simulatorDefinition.id.version}.img`);
                    // await new Promise(resolve => readStream.pipe(writeStream).on("finish", resolve));
                    await newSimulatorDefinition.save();
                    await fs.unlink(simulatorFilePath, (err) => {
                        console.log(`couldn't remove simulator file at ${simulatorFilePath}`);
                    });
                    res.status(200).send();
                } catch (e) {
                    res.status(500).send(e);
                }

            });
    }
}