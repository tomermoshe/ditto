import { Scenario, ScenarioStep } from "../models/Scenario";
import { SimulatorExecutor } from "../controllers/simulatorExecutor";
import { SimulatorConfig, SimulatorConfigModel, SimulatorConfigDocument } from "../models/Simulator";
import { v1 as uuid } from "uuid";
import { dockerode } from "../dockerodeConnector";
import { Network, Container } from "dockerode";
import { ServiceExecutor } from "./serviceExecutor";
import rp from "request-promise";
import promiseRetry from "promise-retry";

export class ScenarioExecutor {


    executionId: string;
    scenario: Scenario;
    serviceIds: string[];
    network: Network;
    constructor(scenario: Scenario) {
        this.scenario = scenario;
        this.serviceIds = new Array();
        this.executionId = uuid();
    }
    public async executeScenario() {
        try {


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
        }


    }

    public async executeCommands() {

        await (async () => {
            for (const step of this.scenario.steps) {
                let options: rp.Options = {
                    method: "POST",
                    uri: `http://${step.simulatorName}:3000/command`,
                    json: true,
                    body: { name: "World" }
                };
                await rp(options);
            }
        })();
        console.log("commands executed");
    }
    public async attachSimulationsManagerToNetwork() {
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

    public async deattachSimulationsManagerFromNetwork() {
        let id = await dockerode.getContainerIdByName("simulations-manager");
        await this.network.disconnect({
            Container: id
        });
        console.log("simulator manager deattached from network");

    }



    public async executeSimulators() {
        console.log("executeSimulators called");

        await Promise.all(this.scenario.simulators.map(async simulator => {
            const simulatorConfig = await SimulatorConfigModel.findOne({ id: simulator.id });
            const serviceId = await SimulatorExecutor.execute(<SimulatorConfig>simulatorConfig, this.executionId, simulator.name);
            this.serviceIds.push(serviceId);
        }));
    }

    public async waitForSimulators() {
        console.log("waiting for simulators");

        await (async () => {
            for (const simulator of this.scenario.simulators) {
                await promiseRetry(async (retry, number) => {
                    try { 
                        let options: rp.Options = {
                            method: "POST",
                            uri: `http://${simulator.name}:3000/ready`,
                            json: true,
                        };
                        await rp(options);
                    } catch (error) {
                        console.log(`${simulator.name} is not ready retry number ${number}`);
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

    public async stopSimulators() {
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