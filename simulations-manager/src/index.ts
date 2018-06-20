import { SimulatorExecutor } from "./controllers/simulatorExecutor";
import { Scenario } from "./models/Scenario";
import { ScenarioExecutor } from "./controllers/scenarioExecutor";
import {MongoConnector} from "./mongoConnector"


setTimeout(function () {
    (async () => {

        var mongoConnector:MongoConnector = new MongoConnector("mongodb://mongodb:27017/test");
        await mongoConnector.connect();

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
        try {
            for (let i = 0; i < 1; i++) {
                const scenarioExecutor: ScenarioExecutor = new ScenarioExecutor(scenario);
                await scenarioExecutor.executeScenario();
            }
        } catch (error) {
            console.log(error);
        }

    }
    )();





}, 7000);

