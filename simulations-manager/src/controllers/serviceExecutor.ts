import { dockerode } from "../connectors/dockerodeConnector";
import { Service } from "dockerode";

export class ServiceExecutor {
    public static async execute(name: string,
        imageName: string,
        version: string,
        networkId: string,
        envs?: string[]): Promise<string> {

        const serviceConfig: any = {
            Name: name,
            TaskTemplate: {
                ContainerSpec: {
                    Image: `${imageName}:${version}`
                }
            },
            Networks: [{
                Target: networkId
            },
            {
                Target: "bridge"
            }]
        };
        if (envs && envs.length > 0) {
            serviceConfig.TaskTemplate.ContainerSpec.Env = envs;
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