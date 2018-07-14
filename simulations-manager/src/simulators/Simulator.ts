import mongoose from "mongoose";

export interface SimulatorId {
    imageName: string;
    version: string;
}

export interface SimulatorInstanceId {
    name: string;
    id: SimulatorId;
}

export interface SimulatorConfig {
    id: SimulatorId;
    envs?: string[];
    // ports?: string[];
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
    // 4 ports: [String]
});

export const SimulatorConfigModel = mongoose.model("SimulatorConfig", SimulatorConfigSchema);
