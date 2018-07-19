import mongoose from "mongoose";

export interface Command {
    name: string;
    body: any;
}

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

export interface CommandDefinition {
    commandName: string;
    commandSchema: any;

}
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