import { SimulatorConfig, SimulatorInstanceId, SimulatorConfigModel } from "./Simulator";
import { ServiceExecutor } from "../controllers/serviceExecutor";

export class SimulatorExecutor {
    public static async execute(simulatorInstanceId: SimulatorInstanceId, networkId: string, simulatorExecutionName: string) {

        const simulatorConfig: SimulatorConfig = <SimulatorConfig>await SimulatorConfigModel.findOne({ id: simulatorInstanceId.id });


        return await ServiceExecutor.execute(simulatorExecutionName,
            simulatorInstanceId.id.imageName,
            simulatorInstanceId.id.version,
            networkId,
            simulatorConfig.envs);
    }

    public static async stop(id: string) {
        await ServiceExecutor.stop(id);
    }
}