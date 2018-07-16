import { SimulatorConfig, SimulatorInstanceId, SimulatorConfigModel } from "./Simulator";
import { ServiceExecutor } from "../controllers/serviceExecutor";

export class SimulatorExecutor {
    dnsName: string;
    instanceId: SimulatorInstanceId;
    networkId: string;
    executionId: string;

    constructor(instanceId: SimulatorInstanceId, networkId: string) {
        this.networkId = networkId;
        this.instanceId = instanceId;
        this.dnsName = `${instanceId.name}-${this.networkId}`;
    }


    public async execute() {

        const simulatorConfig: SimulatorConfig = <SimulatorConfig>await SimulatorConfigModel.findOne({ id: this.instanceId.id });

        this.executionId =  await ServiceExecutor.execute(this.dnsName,
            this.instanceId.id.imageName,
            this.instanceId.id.version,
            this.networkId,
            simulatorConfig.envs);
    }

    public async stop() {
        await ServiceExecutor.stop(this.executionId);
    }
}