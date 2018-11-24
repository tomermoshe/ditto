import { Command } from "../commands/Command";

export interface ScenarioStep {
    simulatorName: string;
    command: Command;
}

export interface Scenario {
    name: string;
    steps: Array<ScenarioStep>;
}

interface PScenario<IdType> extends Scenario {
    _id: IdType;
}
export type ScenarioJSON = PScenario<string>;



