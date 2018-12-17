import { dockerode } from "../connectors/DockerodeConnector";
import { Service } from "dockerode";
import { ExposedPort } from "ditto-shared";

export class ServiceExecutor {
    public static async execute(name: string,
        imageName: string,
        version: string,
        networkId: string,
        envs?: string[],
        exposedPorts?: ExposedPort[]
    ): Promise<string> {

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
        if (exposedPorts && exposedPorts.length > 0) {
            serviceConfig.EndpointSpec = {
                ...serviceConfig.EndpointSpec,
                Ports: this.portsToRemoteApiFormat(exposedPorts)
            };
        }
        if (envs && envs.length > 0) {
            serviceConfig.TaskTemplate.ContainerSpec.Env = envs;
        }
        const service: Service = await dockerode.createService(serviceConfig);
        console.log(`Simulator started with id ${service.id}`);
        return service.id;
    }
    private static portsToRemoteApiFormat(ports: ExposedPort[]) {

        return ports.map(port => {
            return {
                Protocol: port.type.toString(),
                PublishedPort: port.port,
                TargetPort: port.port
            };

        });
    }
    public static async stop(id: string) {
        const s: Service = await dockerode.getService(id);
        if (s) {
            await s.remove();
            console.log(`Simulator stopped with id ${id}`);

        }
    }
}