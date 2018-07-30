import { SimulatorId } from "./simulatorId";

import mongoose from "mongoose";
import {  CommandDefinitionSchema } from "../commands/Command";
import { SimulatorConfig } from "./simulatorConfig";

export interface SimulatorInstanceId {
    name: string;
    id: SimulatorId;
}




export type SimulatorConfigDocument = mongoose.Document & SimulatorConfig;


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
    id: SimulatorIdSchema
}, { _id: false });

const SimulatorConfigSchema = new mongoose.Schema({
    id: {
        type: SimulatorIdSchema,
        required: true,
        unique: true
    },
    envs: [String],
    commands: [CommandDefinitionSchema]
    // 4 ports: [String]
});

export const SimulatorConfigModel = mongoose.model<SimulatorConfigDocument>("SimulatorConfig", SimulatorConfigSchema);
