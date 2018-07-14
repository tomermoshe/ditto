import { SimulatorConfig, SimulatorInstanceId, SimulatorConfigModel } from "../models/Simulator";
import { ServiceExecutor } from "./serviceExecutor";

export class SimulatorExecutor {
    public static async execute(simulator: SimulatorInstanceId, network: string, simulatorInstanceName: string) {

        const simulatorConfig: SimulatorConfig = <SimulatorConfig>await SimulatorConfigModel.findOne({ id: simulator.id });


        return await ServiceExecutor.execute(simulatorInstanceName,
            simulator.id.imageName,
            simulator.id.version,
            network,
            simulatorConfig.envs);
    }

    public static async stop(id: string) {
        await ServiceExecutor.stop(id);
    }
}