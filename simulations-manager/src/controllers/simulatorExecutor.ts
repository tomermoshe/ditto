import { SimulatorConfig } from "../models/Simulator";
import { dockerode } from "./../dockerodeConnector";
import { Service } from "dockerode";
import { ServiceExecutor } from "./serviceExecutor";

export class SimulatorExecutor {
    public static async execute(simulator: SimulatorConfig, network: string, simulatorInstanceName: string) {
        return await ServiceExecutor.execute(simulatorInstanceName,
            simulator.id.imageName,
            simulator.id.version,
            network,
            simulator.envs);
    }

    public static async stop(id: string) {
        await ServiceExecutor.stop(id);
    }
}