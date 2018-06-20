import mongoose from "mongoose";

export interface SimulatorId {
    imageName: string;
    version: string;
}

export interface SimulatorInstanceId  {
    name: string;
    id: SimulatorId;
}

export interface SimulatorConfig {
    id: SimulatorId;
    envs?: string[];
    // ports?: string[];
}



export type SimulatorConfigDocument = mongoose.Document & SimulatorConfig;


const simulatorConfigSchema = new mongoose.Schema({
    id: {
        type: {
            imageName: String,
            version: String
        },
        required: true,
        unique: true
    },
    envs: [String],
    // 4 ports: [String]
});

export const SimulatorConfigModel = mongoose.model("SimulatorConfig", simulatorConfigSchema);
