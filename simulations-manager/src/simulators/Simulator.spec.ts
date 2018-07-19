import "mocha";
import { expect } from "chai";
import { SimulatorConfig, SimulatorConfigModel } from "./Simulator";


describe("Simulator model testing", () => {
    let simulatorConfig: SimulatorConfig;
    beforeEach(() => {
        simulatorConfig = {
            id: {
                imageName: "imageName",
                version: "latest",
            },
            commands: []
        };
    });

    it("should be invalid when name is empty", (done) => {

        const simulatorConfigDb = new SimulatorConfigModel(simulatorConfig);
        console.log(JSON.stringify(simulatorConfigDb));
        done();
        // const scenario = new ScenarioModel();
        // scenario.validate((err) => {
        //     expect(err.errors.name).to.exist;
        //     done();
        // });
    });



});