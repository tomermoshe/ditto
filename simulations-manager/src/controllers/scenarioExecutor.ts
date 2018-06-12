import { Scenario, ScenarioStep } from "../models/Scenario";
import { SimulatorExecutor } from "../controllers/simulatorExecutor";
import { SimulatorConfig, SimulatorConfigModel, SimulatorConfigDocument } from "../models/Simulator";
import { v1 as uuid } from "uuid";
import { dockerode } from "../dockerodeConnector";
import { Network, Container } from "dockerode";
import { ServiceExecutor } from "./serviceExecutor";


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
            await this.attachSimulationsManagerToNetwork();
            await this.executeScenarioExecutor();
            await this.executeSimulators();
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
        this.scenario.commands.map(async step:ScenarioStep => )
    }
    public async attachSimulationsManagerToNetwork() {
        let id = await dockerode.getContainerIdByName("simulations-manager");
        await this.network.connect({
            Container: id
        });
    }

    public async deattachSimulationsManagerFromNetwork() {
        let id = await dockerode.getContainerIdByName("simulations-manager");
        await this.network.disconnect({
            Container: id
        });
    }


    public async executeScenarioExecutor() {
        const serviceId = await ServiceExecutor.execute(`se-${this.executionId}`,
            "pavelkh/scenario-executor",
            "latest",
            this.executionId);
        this.serviceIds.push(serviceId);
    }
    public async executeSimulators() {
        console.log("executeSimulators called");

        await Promise.all(this.scenario.simulators.map(async simulator => {
            const simulatorConfig = await SimulatorConfigModel.findOne({ id: simulator.id });
            const serviceId = await SimulatorExecutor.execute(<SimulatorConfig>simulatorConfig, this.executionId, simulator.name);
            this.serviceIds.push(serviceId);
        }));



    }

    private async createNetwork() {
        this.network = await dockerode.createNetwork({
            Name: this.executionId,
            Driver: "overlay",
            Attachable: true

        });
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