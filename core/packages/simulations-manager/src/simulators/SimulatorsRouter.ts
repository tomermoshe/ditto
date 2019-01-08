import { Router, Request, Response } from "express";
import { SimulatorDefinitionModel } from "./SimulatorDefinitionMongo";
import { UploadedFile } from "express-fileupload";
import { SimulatorDefinition, ExposedPort } from "ditto-shared";
import { dockerode } from "../connectors/DockerodeConnector";
import fs from "fs";
import localSimulatorDefinition from "./LocalSimulatorDefinition";
import { PortType } from "ditto-shared";
import promiseRetry from "promise-retry";
const mongoEscape = require("mongo-escape");

const UPLOADS_DIR = `${__dirname}/uploads`;
const IMAGES_DIR = `${__dirname}/images`;


const MONGO_DUPLICATION_ERROR_CODE = 11000;
export class SimulatorRouter {


    static routes(): Router {
        return Router()
            .get("/simulators", async (req: Request, res: Response) => {
                let simulators: SimulatorDefinition[] = await SimulatorDefinitionModel.find({}, "-_id");
                simulators.push(localSimulatorDefinition);
                // removing mongoose keys
                simulators = JSON.parse(JSON.stringify(simulators));
                res.status(200).json(mongoEscape.unescape(simulators));
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
                    const simulatorDefinition: SimulatorDefinition = mongoEscape.escape(req.body.simulator) as SimulatorDefinition;
                    const uploadId: string = req.body.uploadId;

                    const simulatorFilePath = `${UPLOADS_DIR}/${uploadId}.tar`;
                    const tag = `${simulatorDefinition.id.imageName}:${simulatorDefinition.id.version}`;
                    try {
                        const readStream = await dockerode.buildImage(simulatorFilePath,
                            {
                                t: tag
                            });

                        await new Promise((resolve, reject) => {
                            dockerode.modem.followProgress(readStream,
                                (err: any, res: any) => err ? reject(err) : resolve(res),
                                (progress: any) => console.log(progress)
                            );
                        });
                        simulatorDefinition.ports = await SimulatorRouter.getExposedPorts(tag);

                    } catch (error) {
                        throw "simulator docker image wan't built sucessfully " + JSON.stringify(error);
                    }


                    const newSimulatorDefinition = new SimulatorDefinitionModel(simulatorDefinition);
                    try {
                        await newSimulatorDefinition.save();
                        await fs.unlink(simulatorFilePath, (err) => {
                            if (err) {
                                console.log(`couldn't remove simulator file at ${simulatorFilePath}`);
                            }
                        });
                    } catch (error) {
                        if (error.code === MONGO_DUPLICATION_ERROR_CODE) {
                            throw "imageName and version already exists";
                        } else {
                            throw "Couldn't save simulator to db " + error.message;
                        }
                    }

                    res.status(200).send();
                } catch (e) {
                    res.status(500).send(e);
                }

            });
    }

    private static async getExposedPorts(tag: string) {
        return await promiseRetry<ExposedPort[]>(async (retry) => {
            try {
                const image = await dockerode.getImage(tag);
                const imageInfo = await image.inspect();
                const ports: ExposedPort[] = [];
                const exposedPorts = imageInfo.ContainerConfig.ExposedPorts;
                if (!exposedPorts || exposedPorts.length === 0) {
                    return [];
                }
                Object.keys(exposedPorts).forEach((port: string) => {
                    const splitted = port.split("/");
                    ports.push({
                        port: +splitted[0],
                        type: splitted[1] as PortType
                    });
                });
                return ports;
            } catch (error) {
                retry(error);
            }

        }, {
                retries: 5
            });


    }
}