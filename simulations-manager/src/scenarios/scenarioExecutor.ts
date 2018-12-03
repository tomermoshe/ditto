import { Scenario, ScenarioStep } from "./Scenario";
import { LocalCommandsExecutor } from "../commands/localCommandsExecutor";
import { RemoteCommandsExecutor } from "../commands/remoteCommandsExecutor";
import { EventEmitter } from "events";
import EventTypes from "../events/eventsTypes";

export class ScenarioExecutor {
    private executionId: string;
    private scenario: Scenario;
    private eventEmitter: EventEmitter;
    constructor(eventEmitter: EventEmitter, scenario: Scenario, executionId: string) {
        this.scenario = scenario;
        this.executionId = executionId;
        this.eventEmitter = eventEmitter;
    }
    public async executeScenario() {
        await this.executeCommands();
    }

    private getSimulatorExecutionName(simulatorName: string): string {
        return `${simulatorName}-${this.executionId}`;
    }
    private async executeCommands() {
        await (async () => {
            for (const [ i, step] of this.scenario.steps.entries()) {
                this.eventEmitter.emit(EventTypes.STEP_STARTED, i);
                await this.executeSimulatorCommand(step);
                this.eventEmitter.emit(EventTypes.STEP_FINISHED, i);
            }
        })();
        console.log("commands executed");
    }
    private async executeSimulatorCommand(step: ScenarioStep) {
        if (step.simulatorName === "Manager") {
            await LocalCommandsExecutor.execute(step.command);
        } else {
            const simulatorExecutionName: string = this.getSimulatorExecutionName(step.simulatorName);
            await RemoteCommandsExecutor.execute(step.command, simulatorExecutionName);
        }
    }
}