import { SimulatorExecutor } from "../simulators/SimulatorExecutor";
import { dockerode } from "../connectors/DockerodeConnector";
import { Network, NetworkInfo, NetworkInspectInfo } from "dockerode";
import { Environment } from "ditto-shared";
import EnvironmentExecutionError from "./EnvironmentExecutionError";
import { EventEmitter } from "events";
import EventTypes from "../events/EventsTypes";
import { networksPool } from "./NetworksPool";

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
        console.log(`execution ${this.executionId} started`);
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STARTED);
        await this.acquireNetwork();
        await this.executeSimulators();
        await this.waitForSimulators();
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_FINISHED);

    }
    public async acquireNetwork() {
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, "Acquiring network");
        const name = networksPool.acquire();
        this.network = await dockerode.getNetworkByName(name);
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
        this.eventEmitter.emit(EventTypes.ENVIRONMENT_EXECUTION_STATUS, "Executing simulators");

        console.log("executeSimulators called");

        await Promise.all(this.environment.simulators.map(async simulator => {
            const simulatorExecutor = new SimulatorExecutor(simulator,
                this.network.Id,
                `${simulator.name}-${this.executionId}`);
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

    private async stopSimulators() {
        console.log("stopSimulators called");
        await Promise.all(Array.from(this.simulators.values()).map(async simulator => {
            await simulator.stop();
        }));
    }
