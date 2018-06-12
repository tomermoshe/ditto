import { SimulatorExecutor } from "./controllers/simulatorExecutor";
import { Scenario } from "./models/Scenario";
import { ScenarioExecutor } from "./controllers/scenarioExecutor";

setTimeout(function () {
    (async () => {
        const scenario: Scenario = {
            name: "Test",
            simulators: [{
                name: "hello-world",
                id: {
                    imageName: "hello-world-simulator",
                    version: "latest"
                }

            }],
            steps: [{
                simulatorName: "hello-world",
                command: {
                    name: "Pasha"
                }
            }]
        };
        const scenarioExecutor: ScenarioExecutor = new ScenarioExecutor(scenario);
        try {
            await scenarioExecutor.executeScenario();
        } catch (error) {
            console.log(error);
        }

    }
    )();





}, 7000);

