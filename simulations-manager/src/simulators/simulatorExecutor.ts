import { SimulatorInstanceId } from "./simulatorInstanceId";
import { ServiceExecutor } from "../controllers/serviceExecutor";
import promiseRetry from "promise-retry";
import requestPromise from "request-promise";
import { SimulatorId } from "./simulatorId";
import { SimulatorDefinitionModel } from "./SimulatorDefinitionMongo";

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

    private configurationObjectToStringArray(configuration: any): string[] {
        const envs: string[] = [];
        for (const key in configuration) {
            envs.push(`${key}=${configuration[key]}`);
        }
        return envs;
    }
    public async execute() {


        this.executionId = await ServiceExecutor.execute(this.dnsName,
            this.instanceId.id.imageName,
            this.instanceId.id.version,
            this.networkId,
            this.configurationObjectToStringArray(this.instanceId.configuration),
            await this.exposedPortsToStringArray());
    }
    private async exposedPortsToStringArray() {
        const def = await SimulatorDefinitionModel.findOne({ id  : this.instanceId.id });
        return def.ports;

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
        }, {
                retries: 6
            });
    }

    public async stop() {
        await ServiceExecutor.stop(this.executionId);
    }
}