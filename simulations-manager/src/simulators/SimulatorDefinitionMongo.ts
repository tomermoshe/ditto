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
    configSchema: {
        type: Object,
        required: false
    },
    commands: [CommandDefinitionSchema]
    // 4 ports: [String]
});

export const SimulatorDefinitionModel = mongoose.model<SimulatorDefinitionDocument>("SimulatorDefinition", SimulatorDefinitionSchema);
