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


