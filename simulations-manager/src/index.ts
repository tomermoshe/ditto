import { SimulatorExecutor } from "./controllers/simulatorExecutor";
import { Scenario } from "./models/Scenario";
import { ScenarioExecutor } from "./controllers/scenarioExecutor";
(async () => {
    const scenario: Scenario = {
        name: "Test",
        simulators: [{
            name: "nginx",
            id: {
                imageName: "nginx",
                version: "latest"
            }

        }],
        commands: []
    };
    const scenarioExecutor: ScenarioExecutor = new ScenarioExecutor(scenario);
    try {
        await scenarioExecutor.executeScenario();
    } catch (error) {
        console.log(error);
    }

}
)();