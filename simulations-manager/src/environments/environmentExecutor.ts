import { SimulatorExecutor } from "../simulators/simulatorExecutor";
import { dockerode } from "../connectors/dockerodeConnector";
import { Network } from "dockerode";
import rp from "request-promise";
import promiseRetry from "promise-retry";
import uniqid from "uniqid";
import { LocalCommandsExecutor } from "../commands/localCommandsExecutor";
import { RemoteCommandsExecutor } from "../commands/remoteCommandsExecutor";
import { Environment } from "./Environment";

export class EnvironmentExecutor {
    private executionId: string;
    private environment: Environment;
    private simulators: Map<String, SimulatorExecutor>;
    private network: Network;
    constructor(environment: Environment, executionId: string) {
        this.environment = environment;
        this.simulators = new Map();
        this.executionId = executionId;
    }
    public async executeEnironment() {
        console.log(`execution ${this.executionId} started`);
        await this.createNetwork();
        await this.executeSimulators();
        await this.attachSimulationsManagerToNetwork();
        await this.waitForSimulators();
    }

    public async removeEnvironment() {
        await this.deattachSimulationsManagerFromNetwork();
        await this.stopSimulators();
        await this.removeNetwork();
        console.log(`execution ${this.executionId} stopped`);
    }


    private getSimulatorExecutionName(simulatorName: string): string {
        return `${simulatorName}-${this.executionId}`;
    }



    private async attachSimulationsManagerToNetwork() {
        const id = await dockerode.getContainerIdByName("simulations-manager");
        await promiseRetry(this.attachSimulatorToNetworkWithRetries(id));

    }

    private attachSimulatorToNetworkWithRetries(id: string): (retry: (error: any) => never, attempt: number) => Promise<void> {
        return async (retry, number) => {
            try {
                await this.network.connect({
                    Container: id
                });
                console.log("simulator manager attached to network");
            }
            catch (error) {
                console.log(error + " " + "retry number " + number);
                retry(error);
            }
        };
    }

    private async deattachSimulationsManagerFromNetwork() {
        const id = await dockerode.getContainerIdByName("simulations-manager");
        await this.network.disconnect({
            Container: id
        });
        console.log("simulator manager deattached from network");

    }



    private async executeSimulators() {
        console.log("executeSimulators called");

        await Promise.all(this.environment.simulators.map(async simulator => {
            const simulatorExecutor = new SimulatorExecutor(simulator, this.executionId);
            await simulatorExecutor.execute();
            this.simulators.set(simulator.name, simulatorExecutor);
        }));
    }

    private async waitForSimulators() {
        console.log("waiting for simulators");

        await (async () => {
            for (const simulator of this.simulators.values()) {
                await simulator.waitFor();
            }
        })();

    }

    private async createNetwork() {
        this.network = await dockerode.createNetwork({
            Name: this.executionId,
            Driver: "overlay",
            Attachable: true

        });
        console.log(`network id ${this.network.id} created`);
    }

    private async stopSimulators() {
        console.log("stopSimulators called");
        await Promise.all(Array.from(this.simulators.values()).map(async simulator => {
            await simulator.stop();
        }));
    }

    private async removeNetwork() {
        if (this.network) {
            this.network.remove();
            console.log("network removed");
        }
    }
}