import { SimulatorId } from "./SimulatorConfig";
import mongoose from "mongoose";
export interface Scenario {
    name: string;
    simulators: Array<SimulatorId>;
}

export type ScenarioDocument = Scenario & mongoose.Document;


