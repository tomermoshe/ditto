import mongoose from "mongoose";

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