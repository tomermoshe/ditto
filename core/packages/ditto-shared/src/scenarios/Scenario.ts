import { Command } from "../commands/Command";

export interface ScenarioStep {
    simulatorName: string;
    command: Command;
}

export interface ScenarioStepStatus extends ScenarioStep {
    status?: "error" | "finish" | "wait" | "process";
    message?: string;
}
export interface Scenario {
    name: string;
    steps: Array<ScenarioStep>;
}

export interface PScenario<IdType> extends Scenario {
    _id: IdType;
}
export type ScenarioJSON = PScenario<string>;



