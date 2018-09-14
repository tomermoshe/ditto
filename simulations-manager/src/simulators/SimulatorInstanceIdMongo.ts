import mongoose from "mongoose";
import { SimulatorIdSchema } from "./SimulatorIdMongo";



export const SimulatorInstanceIdSchema = new mongoose.Schema({
    name: String,
    id: SimulatorIdSchema,
    configuration: Object
}, { _id: false });

