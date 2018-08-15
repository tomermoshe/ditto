import { SimulatorInstanceId, SimulatorInstanceIdSchema } from "../simulators/Simulator";
import mongoose from "mongoose";
export interface Environment {
    name: string;
    simulators: Array<SimulatorInstanceId>;
}

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