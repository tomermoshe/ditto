import { Scenario } from "../models/Scenario";
import { SimulatorExecutor } from "../controllers/simulatorExecutor";
import { SimulatorConfig, SimulatorConfigModel, SimulatorConfigDocument } from "../models/Simulator";
import { v1 as uuid } from "uuid";
import { dockerode } from "../dockerodeConnector";
import { Network } from "dockerode";
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
        await this.createNetwork();
        await this.createScenarioExecutor();
        await this.executeSimulators();
        await this.stopSimulators();
        await this.removeNetwork();

    }
    public async createScenarioExecutor() {
        await ServiceExecutor.execute("scenario-executor", "pavelkh/service-executor", "latest", this.executionId, []);
    }
    public async executeSimulators() {
        console.log("executeSimulators called");
        try {
            await Promise.all(this.scenario.simulators.map(async simulator => {
                const simulatorConfig = await SimulatorConfigModel.findOne({ id: simulator.id });
                const serviceId = await SimulatorExecutor.execute(<SimulatorConfig>simulatorConfig, this.executionId, simulator.name);
                this.serviceIds.push(serviceId);
            }));
        } catch (e) {
            console.log(e);
        }


    }

    private async createNetwork() {
        this.network = await dockerode.createNetwork({
            Name: this.executionId,
            Driver: "overlay"
        });
    }

    public async stopSimulators() {
        console.log("stopSimulators called");
        this.serviceIds.forEach(async serviceId => {
            console.log(`stopping serviceId ${serviceId}`);
            await SimulatorExecutor.stop(serviceId);
        });
        await this.removeNetwork();
    }

    private async removeNetwork() {
        if (this.network) {
            this.network.remove();
        }
    }
}