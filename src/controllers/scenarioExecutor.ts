import { Scenario } from "../models/Scenario";
import { SimulatorExecutor } from "../controllers/simulatorExecutor";
import { SimulatorConfig, SimulatorConfigModel, SimulatorConfigDocument } from "../models/SimulatorConfig";
import { v1 as uuid } from "uuid";
import { dockerode } from "../dockerodeConnector";
import { Network } from "dockerode";


export class ScenarioExecutor {
    execudtionId: string;
    scenario: Scenario;
    serviceIds: string[];
    constructor(scenario: Scenario) {
        this.scenario = scenario;
        this.serviceIds = new Array();
        this.execudtionId = uuid();
    }
    public async executeSimulators() {
        console.log("executeSimulators called");
        try {
            await this.createNetwork();
            await Promise.all(this.scenario.simulators.map(async simulatorId => {
                const simulator = await SimulatorConfigModel.findOne({ id: simulatorId });
                const serviceId = await SimulatorExecutor.execute(<SimulatorConfig>simulator, this.execudtionId);
                this.serviceIds.push(serviceId);
            }));
        } catch (e) {
            console.log(e);
        }


    }

    private async createNetwork() {
        await dockerode.createNetwork({
            Name: this.execudtionId,
            Driver : "overlay"
        });
    }

    public async stopSimulators() {
        console.log("stopSimulators called");
        this.serviceIds.forEach(async serviceId => {
            console.log(`stopping serviceId ${serviceId}`);
            await SimulatorExecutor.stop(serviceId);
        });
        const network = await dockerode.getNetwork(this.execudtionId);
        network.remove();
    }
}