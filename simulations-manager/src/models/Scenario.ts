import { SimulatorId, SimulatorInstanceId } from "./Simulator";
import mongoose from "mongoose";



export interface Scenario {
    name: string;
    simulators: Array<SimulatorInstanceId>;
}

export type ScenarioDocument = Scenario & mongoose.Document;


