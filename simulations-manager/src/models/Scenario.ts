import { SimulatorId, SimulatorInstanceId } from "./Simulator";
import mongoose from "mongoose";






export interface ScenarioCommand {
    simulatorName: string;
    command: any;
}

export interface Scenario {
    name: string;
    simulators: Array<SimulatorInstanceId>;
    commands: Array<ScenarioCommand>;

}

export type ScenarioDocument = Scenario & mongoose.Document;


