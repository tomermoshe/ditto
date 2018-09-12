import { SimulatorId } from "./simulatorId";

import mongoose from "mongoose";
import { CommandDefinitionSchema } from "../commands/Command";
import { SimulatorDefinition } from "./simulatorDefinition";

export interface SimulatorInstanceId {
    name: string;
    id: SimulatorId;
    // envs?: string[];
    configuration: object;
}




export type SimulatorDefinitionDocument = mongoose.Document & SimulatorDefinition;


export const SimulatorIdSchema = new mongoose.Schema({
    imageName: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    }
}, { _id: false });

export const SimulatorInstanceIdSchema = new mongoose.Schema({
    name: String,
    id: SimulatorIdSchema,
    envs: [String]
}, { _id: false });

const SimulatorDefinitionSchema = new mongoose.Schema({
    id: {
        type: SimulatorIdSchema,
        required: true,
        unique: true
    },
    commandSchema: {
        type: Object,
        required: false
    },
    commands: [CommandDefinitionSchema]
    // 4 ports: [String]
}, { _id: false });

export const SimulatorDefinitionModel = mongoose.model<SimulatorDefinitionDocument>("SimulatorDefinition", SimulatorDefinitionSchema);
