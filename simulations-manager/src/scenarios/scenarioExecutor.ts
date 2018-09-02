import { Scenario, ScenarioStep } from "./Scenario";
import { LocalCommandsExecutor } from "../commands/localCommandsExecutor";
import { RemoteCommandsExecutor } from "../commands/remoteCommandsExecutor";

export class ScenarioExecutor {
    private executionId: string;
    private scenario: Scenario;
    constructor(scenario: Scenario, executionId: string) {
        this.scenario = scenario;
        this.executionId = executionId;
    }
    public async executeScenario() {
        await this.executeCommands();
    }

    private getSimulatorExecutionName(simulatorName: string): string {
        return `${simulatorName}-${this.executionId}`;
    }
    private async executeCommands() {
        await (async () => {
            for (const step of this.scenario.steps) {
                await this.executeSimulatorCommand(step);
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