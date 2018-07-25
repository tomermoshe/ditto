import { SimulatorId } from "./simulatorId";
import { CommandDefinition } from "../commands/Command";

export interface SimulatorConfig {
    id: SimulatorId;
    envs?: string[];
    // ports?: string[];
    commands: CommandDefinition[];
}