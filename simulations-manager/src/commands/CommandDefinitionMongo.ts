import mongoose from "mongoose";

export const CommandDefinitionSchema = new mongoose.Schema({
    commandName: {
        type: String,
        required: true
    },
    commandSchema: {
        type: Object,
        required: true
    }
}, { _id: false });