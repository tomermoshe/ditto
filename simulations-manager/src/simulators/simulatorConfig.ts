import { SimulatorId } from "./simulatorId";
import { CommandDefinition } from "../commands/commandDefenition";

export interface SimulatorConfig {
    id: SimulatorId;
    configSchema?: any;
    // ports?: string[];
    commands: CommandDefinition[];

}