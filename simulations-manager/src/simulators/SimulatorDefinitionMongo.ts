import mongoose from "mongoose";
import { SimulatorDefinition } from "./simulatorDefinition";
import { SimulatorIdSchema } from "./SimulatorIdMongo";
import { CommandDefinitionSchema } from "../commands/CommandDefinitionMongo";

export type SimulatorDefinitionDocument = mongoose.Document & SimulatorDefinition;


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
