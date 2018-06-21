import { SimulatorId, SimulatorInstanceId } from "./Simulator";
import mongoose from "mongoose";






export interface ScenarioStep {
    simulatorName: string;
    command: any;
}

export interface Scenario {
    name: string;
    simulators: Array<SimulatorInstanceId>;
    steps: Array<ScenarioStep>;

}

export type ScenarioDocument = Scenario & mongoose.Document;


const scenarioSchema = new mongoose.Schema({
    name: String,
    simulators: [{
        name: String,
        id: {
            type: {
                imageName: String,
                version: String
            }
        }
    }],
    steps: {
        type: {
            simulatorName: String,
            command: Object
        }
    }
});

export const scenarioModel = mongoose.model<ScenarioDocument>("Scenario", scenarioSchema);