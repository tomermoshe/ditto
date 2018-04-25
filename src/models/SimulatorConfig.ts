import mongoose from "mongoose";
mongoose.connect("mongodb://192.168.99.100/test").then(
    () => {  console.log("MongoDB connected") },
  ).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
  });


export interface SimulatorId {
    name: string,
    version : string
}  
export interface SimulatorConfig {
    id: SimulatorId
    envs?: string[],
    ports? : string[]
};



export type SimulatorConfigDocument = mongoose.Document & SimulatorConfig;


const simulatorConfigSchema = new mongoose.Schema({
    id: {
        type: {
            name: String,
            version : String
        },
        required : true,
        unique : true
    },
    envs : [String],
    ports : [String]
});

export const SimulatorConfigModel = mongoose.model("SimulatorConfig", simulatorConfigSchema);
