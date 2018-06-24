import { Scenario, ScenarioStep } from "../models/Scenario";
import { SimulatorExecutor } from "../controllers/simulatorExecutor";
import { SimulatorConfig, SimulatorConfigModel, SimulatorConfigDocument } from "../models/Simulator";
import { dockerode } from "../connectors/dockerodeConnector";
import { Network, Container } from "dockerode";
import { ServiceExecutor } from "./serviceExecutor";
import rp from "request-promise";
import promiseRetry from "promise-retry";
import uniqid from "uniqid";

export class ScenarioExecutor {


    executionId: string;
    scenario: Scenario;
    serviceIds: string[];
    network: Network;
    constructor(scenario: Scenario) {
        this.scenario = scenario;
        this.serviceIds = new Array();
        this.executionId = uniqid();
    }
    public async executeScenario() {
        try {
            console.log(`execution ${this.executionId} started`);
            await this.createNetwork();
            await this.executeSimulators();
            await this.attachSimulationsManagerToNetwork();
            await this.waitForSimulators();
            await this.executeCommands();
        } catch (error) {
            console.log(error);
        } finally {
            await this.deattachSimulationsManagerFromNetwork();
            await this.stopSimulators();
            await this.removeNetwork();
            console.log(`execution ${this.executionId} stopped`);

        }
    }

    private getSimulatorExecutionName(simulatorName: string): string {
        return `${simulatorName}-${this.executionId}`;
    }
    private async executeCommands() {

        await (async () => {
            for (const step of this.scenario.steps) {
                const simulatorExecutionName: string = this.getSimulatorExecutionName(step.simulatorName);
                let options: rp.Options = {
                    method: "POST",
                    uri: `http://${simulatorExecutionName}:3000/command`,
                    json: true,
                    body: { name: "World" }
                };
                await rp(options);
            }
        })();
        console.log("commands executed");
    }
    private async attachSimulationsManagerToNetwork() {
        let id = await dockerode.getContainerIdByName("simulations-manager");
        await promiseRetry(this.attachSimulatorToNetworkWithRetries(id))

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
        let id = await dockerode.getContainerIdByName("simulations-manager");
        await this.network.disconnect({
            Container: id
        });
        console.log("simulator manager deattached from network");

    }



    private async executeSimulators() {
        console.log("executeSimulators called");

        await Promise.all(this.scenario.simulators.map(async simulator => {
            const simulatorConfig = await SimulatorConfigModel.findOne({ id: simulator.id });
            const serviceId = await SimulatorExecutor.execute(<SimulatorConfig>simulatorConfig,
                this.executionId,
                this.getSimulatorExecutionName(simulator.name));
            this.serviceIds.push(serviceId);
        }));
    }

    private async waitForSimulators() {
        console.log("waiting for simulators");

        await (async () => {
            for (const simulator of this.scenario.simulators) {
                const simulatorExecutionName = this.getSimulatorExecutionName(simulator.name);
                await promiseRetry(async (retry, number) => {
                    try {
                        let options: rp.Options = {
                            method: "POST",
                            uri: `http://${simulatorExecutionName}:3000/ready`,
                            json: true,
                        };
                        await rp(options); 
                    } catch (error) {
                        console.log(`${this.getSimulatorExecutionName(simulator.name)} is not ready retry number ${number} ${error}`);
                        retry(error);
                    }
                });

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
        await Promise.all(this.serviceIds.map(async serviceId => {
            await SimulatorExecutor.stop(serviceId);
        }));
    }

    private async removeNetwork() {
        if (this.network) {
            this.network.remove();
            console.log("network removed");
        }
    }
}