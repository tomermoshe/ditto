import { SimulatorId } from "./simulatorId";
import { CommandDefinition } from "../commands/commandDefenition";

export interface SimulatorConfig {
    id: SimulatorId;
    envs?: string[];
    // ports?: string[];
    commands: CommandDefinition[];
}