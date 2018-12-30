import { SimulatorInstanceId } from "ditto-shared";
import { ServiceExecutor } from "../controllers/ServiceExecutor";
import promiseRetry from "promise-retry";
import requestPromise from "request-promise";
import { SimulatorDefinitionModel } from "./SimulatorDefinitionMongo";

export class SimulatorExecutor {
    dnsName: string;
    instanceId: SimulatorInstanceId;
    networkId: string;
    serviceId: string;

    constructor(instanceId: SimulatorInstanceId, networkId: string, dnsName: string) {
        this.networkId = networkId;
        this.instanceId = instanceId;
        this.dnsName = dnsName;
    }

    private configurationObjectToStringArray(configuration: any): string[] {
        const envs: string[] = [];
        for (const key in configuration) {
            envs.push(`${key}=${configuration[key]}`);
        }
        return envs;
    }
    public async execute() {


        this.serviceId = await ServiceExecutor.execute(this.dnsName,
            this.instanceId.id.imageName,
            this.instanceId.id.version,
            this.networkId,
            this.configurationObjectToStringArray(this.instanceId.configuration),
            await this.exposedPortsToStringArray());
    }
    private async exposedPortsToStringArray() {
        const def = await SimulatorDefinitionModel.findOne({ id: this.instanceId.id });
        return def.ports;

    }
    public async waitFor() {
        await promiseRetry(async (retry, number) => {
            try {
                const options: requestPromise.Options = {
                    method: "GET",
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
        await ServiceExecutor.stop(this.serviceId);
    }
}