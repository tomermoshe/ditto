import mongoose from "mongoose";
import { Environment } from "ditto-shared";
import { SimulatorInstanceIdSchema } from "../simulators/SimulatorInstanceIdMongo";

export type EnvironmentDocument = Environment & mongoose.Document;

const EnvironmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    simulators: [{
        type: SimulatorInstanceIdSchema,
        _id: false,
        required: true
    }]
});

export const EnvironmentModel = mongoose.model<EnvironmentDocument>("Environment", EnvironmentSchema);