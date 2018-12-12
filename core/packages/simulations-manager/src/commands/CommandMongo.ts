import mongoose from "mongoose";


export const CommandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    body: {
        type: Object,
        required: true
    }
}, { _id: false });
