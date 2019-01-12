import { dockerode } from "../connectors/DockerodeConnector";
import { NetworkInspectInfo } from "dockerode";
import { Environment, EventTypes } from "ditto-shared";
import { EventEmitter } from "events";
import { networksPool } from "./NetworksPool";
import { SimulatorExecutor } from "../simulators/SimulatorExecutor";

export class EnvironmentExecutor {
    private executionId: string;
    private environment: Environment;
    private simulators: Map<String, SimulatorExecutor>;
    private network: NetworkInspectInfo;
    private eventEmitter: EventEmitter;
    constructor(eventEmitter: EventEmitter, environment: Environment, executionId: string) {
        this.environment = environment;
        this.simulators = new Map();
        this.executionId = executionId;
        this.eventEmitter = eventEmitter;
    }
    public async executeEnvironment() {
        try {
            console.log(`execution ${this.executionId} started`);
            this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STARTED);
            await this.acquireNetwork();
            await this.executeSimulators();
            await this.waitForSimulators();
            this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_FINISHED);
        } catch (error) {
            this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_FAILED, error.toString());
            throw error;
        }
    }
    public async acquireNetwork() {
        try {
            this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, "Acquiring network");
            const name = networksPool.acquire();
            this.network = await dockerode.getNetworkByName(name);
        } catch (error) {
            throw new Error("Couldn't aquire network " + error);
        }
    }
    public async releaseNetwork() {
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, "Releasing network");
        networksPool.release(this.network.Name);
    }
    public async removeEnvironment() {
        await this.stopSimulators();

        this.releaseNetwork();
        console.log(`execution ${this.executionId} stopped`);
    }


    private async executeSimulators() {
        try {
            this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, "Executing simulators");
            console.log("executeSimulators called");
            await Promise.all(this.environment.simulators.map(async simulator => {
                const simulatorExecutor = new SimulatorExecutor(simulator,
                    this.network.Id,
                    `${simulator.name}-${this.executionId}`);
                await simulatorExecutor.execute();
                this.simulators.set(simulator.name, simulatorExecutor);
            }));
        } catch (error) {
            throw new Error("Couldn't execute simulators " + error);
        }
    }

    private async waitForSimulators() {

        try {
            this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, "Waiting for simulators to be ready");
            console.log("waiting for simulators");
            await (async () => {
                for (const simulator of this.simulators.values()) {
                    await simulator.waitFor();
                }
            })();
        } catch (error) {
            throw new Error("Not all the simulators were ready " + error);
        }


    }

    private async stopSimulators() {
        console.log("stopSimulators called");
        await Promise.all(Array.from(this.simulators.values()).map(async simulator => {
            await simulator.stop();
        }));
    }
}
