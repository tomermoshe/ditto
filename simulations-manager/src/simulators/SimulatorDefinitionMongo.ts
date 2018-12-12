import mongoose from "mongoose";
import { SimulatorDefinition } from "./simulatorDefinition";
import { SimulatorIdSchema } from "./SimulatorIdMongo";
import { CommandDefinitionSchema } from "../commands/CommandDefinitionMongo";

export type SimulatorDefinitionDocument = mongoose.Document & SimulatorDefinition;


const ExposedPortSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["tcp", "udp"],
        required: true
    },
    port: {
        type: Number,
        required: true
    }
});

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
    commands: [CommandDefinitionSchema],
    ports: [ExposedPortSchema]
});

export const SimulatorDefinitionModel = mongoose.model<SimulatorDefinitionDocument>("SimulatorDefinition", SimulatorDefinitionSchema);
