import { SimulatorConfig } from "../models/SimulatorConfig";
import Dockerode from "dockerode";
import { Service } from "dockerode";

const dockerode = new Dockerode({ host: "http://192.168.99.100", port: 2376 });


export class SimulatorExecutor {
    public static async execute(simulator: SimulatorConfig) {
        const service: Service = await dockerode.createService({
            Name: simulator.id.name,
            TaskTemplate: {
                ContainerSpec: {
                    Image: `${simulator.id.name}:${simulator.id.version}`
                }
            }
        });
        return service.id;
    }

    public static async stop(id: string) {
        const s: Service = await dockerode.getService(id);
        if (s) {
            await s.remove();
        }
    }
}