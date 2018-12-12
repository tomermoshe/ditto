import { SimulatorExecutor } from "../simulators/SimulatorExecutor";
import { dockerode } from "../connectors/DockerodeConnector";
import { Network } from "dockerode";
import promiseRetry from "promise-retry";
import { Environment } from "ditto-shared";
import EnvironmentExecutionError from "./EnvironmentExecutionError";
import { EventEmitter } from "events";
import EventTypes from "../events/EventsTypes";

export class EnvironmentExecutor {
    private executionId: string;
    private environment: Environment;
    private simulators: Map<String, SimulatorExecutor>;
    private network: Network;
    private eventEmitter: EventEmitter;
    constructor(eventEmitter: EventEmitter, environment: Environment, executionId: string) {
        this.environment = environment;
        this.simulators = new Map();
        this.executionId = executionId;
        this.eventEmitter = eventEmitter;
    }
    public async executeEnvironment() {
        console.log(`execution ${this.executionId} started`);
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STARTED);
        await this.createNetwork();
        await this.executeSimulators();
        await this.attachSimulationsManagerToNetwork();
        await this.waitForSimulators();
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_FINISHED);

    }

    public async removeEnvironment() {
        await this.deattachSimulationsManagerFromNetwork();
        await this.stopSimulators();
        await this.removeNetwork();
        console.log(`execution ${this.executionId} stopped`);
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
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, "Executing simulators");

        console.log("executeSimulators called");

        await Promise.all(this.environment.simulators.map(async simulator => {
            const simulatorExecutor = new SimulatorExecutor(simulator, this.executionId);
            await simulatorExecutor.execute();
            this.simulators.set(simulator.name, simulatorExecutor);
        }));
    }

    private async waitForSimulators() {
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, "Waiting for simulators to be ready");

        console.log("waiting for simulators");
        try {
            await (async () => {
                for (const simulator of this.simulators.values()) {
                    await simulator.waitFor();
                }
            })();
        } catch (error) {
            throw new EnvironmentExecutionError(error);
        }


    }

    private async createNetwork() {
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, "Creating network");
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