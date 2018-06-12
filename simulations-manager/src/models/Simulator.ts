import mongoose from "mongoose";
mongoose.connect("mongodb://mongodb/test").then(
    () => { console.log("MongoDB connected"); },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});


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
