import { SimulatorId, SimulatorInstanceId, SimulatorIdSchema, SimulatorInstanceIdSchema } from "./Simulator";
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


const ScenarioStepSchema = new mongoose.Schema({
    simulatorName: {
        type: String,
        required: true
    },
    command: {
        type: Object,
        required: true
    }
}, { _id: false });


const ScenarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    simulators: [{
        type: SimulatorInstanceIdSchema,
        _id: false,
        required: true
    }],
    steps: [{
        type: ScenarioStepSchema,
        _id: false,
        required: true
    }]
});

export const ScenarioModel = mongoose.model<ScenarioDocument>("Scenario", ScenarioSchema);