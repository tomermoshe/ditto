import { Command } from "../commands/Command";

export interface ScenarioStep {
    simulatorName: string;
    command: Command;
}

export interface Scenario {
    name: string;
    steps: Array<ScenarioStep>;
}




