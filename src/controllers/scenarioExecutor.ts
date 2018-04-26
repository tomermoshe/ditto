import { Scenario } from "../models/Scenario";
import { SimulatorExecutor } from "../controllers/simulatorExecutor";
import { SimulatorConfig, SimulatorConfigModel, SimulatorConfigDocument } from "../models/SimulatorConfig";

export class ScenarioExecutor {
    scenario: Scenario;
    serviceIds: string[];
    constructor(scenario: Scenario) {
        this.scenario = scenario;
        this.serviceIds = new Array();
    }
    public async executeSimulators() {
        console.log("executeSimulators called");

        await Promise.all(this.scenario.simulators.map(async simulatorId => {
            const simulator = await SimulatorConfigModel.findOne({ id: simulatorId });
            const serviceId = await SimulatorExecutor.execute(<SimulatorConfig>simulator);
            this.serviceIds.push(serviceId);
        }));

        // this.scenario.simulators.forEach(async simulatorId => {
        //     const simulator = await SimulatorConfigModel.findOne({ id: simulatorId });
        //     const serviceId = await SimulatorExecutor.execute(<SimulatorConfig>simulator);
        //     this.serviceIds.push(serviceId);
        // });
    }

    public async stopSimulators() {
        console.log("stopSimulators called");
        this.serviceIds.forEach(async serviceId => {
            console.log(`stopping serviceId ${serviceId}`);
            await SimulatorExecutor.stop(serviceId);
        });
    }
}