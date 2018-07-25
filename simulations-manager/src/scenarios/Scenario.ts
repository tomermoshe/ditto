import { SimulatorInstanceId, SimulatorIdSchema, SimulatorInstanceIdSchema } from "../simulators/Simulator";
import { SimulatorId } from "../simulators/simulatorId";
import mongoose from "mongoose";
import { Command, CommandSchema } from "../commands/Command";

export interface ScenarioStep {
    simulatorName: string;
    command: Command;
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
        type: CommandSchema,
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