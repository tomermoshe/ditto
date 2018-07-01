import "mocha";
import { expect } from "chai";
import { ScenarioModel, Scenario } from "./Scenario";
describe("Scenario model testing", () => {
    let scenario: Scenario;
    beforeEach(() => {
        scenario = {
            name: "Test",
            simulators: [{
                id: {
                    imageName: "hello-world-simulator",
                    version: "latest"
                },
                name: "hello-world"
            }],
            steps: [{
                command: {
                    name: "Pasha"
                },
                simulatorName: "hello-world"
            }]

        };
    });

    it("should be invalid when name is empty", (done) => {
        const scenario = new ScenarioModel();
        scenario.validate((err) => {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it("simulators array elements shouldn't have _id", (done) => {
        const scenarioMongo: any = new ScenarioModel(scenario);
        scenarioMongo.validate((err: any) => {
            expect(scenarioMongo.simulators[0]._id).to.be.undefined;
            done();
        });
    });

    it("steps array elements shouldn't have _id", (done) => {
        const scenarioMongo: any = new ScenarioModel(scenario);
        scenarioMongo.validate((err: any) => {
            expect(scenarioMongo.steps[0]._id).to.be.undefined;
            done();
        });
    });


});