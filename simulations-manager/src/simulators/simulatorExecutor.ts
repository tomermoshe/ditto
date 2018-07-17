import { SimulatorConfig, SimulatorInstanceId, SimulatorConfigModel } from "./Simulator";
import { ServiceExecutor } from "../controllers/serviceExecutor";
import promiseRetry from "promise-retry";
import requestPromise from "request-promise";

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

        this.executionId = await ServiceExecutor.execute(this.dnsName,
            this.instanceId.id.imageName,
            this.instanceId.id.version,
            this.networkId,
            simulatorConfig.envs);
    }

    public async waitFor() {
        await promiseRetry(async (retry, number) => {
            try {
                const options: requestPromise.Options = {
                    method: "POST",
                    uri: `http://${this.dnsName}:3000/ready`,
                    json: true,

                };
                await requestPromise(options);
            } catch (error) {
                console.log(`${this.dnsName} is not ready retry number ${number} ${error}`);
                retry(error);
            }
        });
    }

    public async stop() {
        await ServiceExecutor.stop(this.executionId);
    }
}