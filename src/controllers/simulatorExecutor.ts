import { SimulatorConfig } from "../models/SimulatorConfig";
import { dockerode } from "./../dockerodeConnector";
import { Service } from "dockerode";

export class SimulatorExecutor {
    public static async execute(simulator: SimulatorConfig, network: String) {

        const serviceConfig: any = {
            Name: simulator.id.name,
            TaskTemplate: {
                ContainerSpec: {
                    Image: `${simulator.id.name}:${simulator.id.version}`
                }
            },
            Networks: [{
                Target: network
            }]
        };
        if (simulator.envs.length > 0) {
            serviceConfig.TaskTemplate.ContainerSpec.Env = simulator.envs;
        }
        const service: Service = await dockerode.createService(serviceConfig);
        console.log(`Simulator started with id ${service.id}`);
        return service.id;
    }

    public static async stop(id: string) {
        const s: Service = await dockerode.getService(id);
        if (s) {
            await s.remove();
            console.log(`Simulator stopped with id ${id}`);

        }
    }
}