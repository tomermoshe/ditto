import { SimulatorId } from "./simulatorId";
import { CommandDefinition } from "../commands/commandDefenition";

export interface SimulatorDefinition {
    id: SimulatorId;
    configSchema?: any;
    // ports?: string[];
    commands: CommandDefinition[];

}