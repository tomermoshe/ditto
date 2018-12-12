import mongoose from "mongoose";
import { CommandSchema } from "../commands/CommandMongo";
import { Scenario } from "ditto-shared";


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
    steps: [{
        type: ScenarioStepSchema,
        _id: false,
        required: true
    }]
});

export const ScenarioModel = mongoose.model<ScenarioDocument>("Scenario", ScenarioSchema);