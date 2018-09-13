import express from "express";
import { json, urlencoded } from "body-parser";
import { TestRouter } from "./tests/testRouter";
import http from "http";
import { MongoConnector } from "./connectors/mongoConnector";
import { dockerode } from "./connectors/dockerodeConnector";
import { EnvironmentCleaner } from "./controllers/environmentCleaner";
import { SimulatorRouter } from "./simulators/simulatorsRouter";
import { EnvironmentRouter } from "./environments/environmentRouter";



(async () => {
    const mongoConnector: MongoConnector = new MongoConnector("mongodb://mongodb:27017/test");
    const environmentCleaner = new EnvironmentCleaner();
    environmentCleaner.initialize();
    await mongoConnector.connect();

    const app = express();

    app.use(json());
    app.use(urlencoded({
        extended: true
    }));
    app.get("/", (request: express.Request, response: express.Response) => {

        response.json({
            name: "Express application"
        });
    });
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Request headers you wish to allow
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");


        // Pass to next layer of middleware
        next();
    });

    app.use("/api", TestRouter.routes());

    app.use("/api", SimulatorRouter.routes());

    app.use("/api", EnvironmentRouter.routes());

    const server: http.Server = app.listen(3000, () => {
        console.log("App started");

    });




})();







// setTimeout(function () {
//     (async () => {




//         var scenario : Scenario = <Scenario>(await scenarioModel.findOne({name:"Test"}));
//         console.log(scenario);
//         console.log(scenario.simulators[0].name);

        // var scenario = new scenarioModel({
        //     name: "Test",
        //     simulators: [{
        //         name: "hello-world",
        //         id: {
        //             imageName: "hello-world-simulator",
        //             version: "latest"
        //         }

        //     }],
        //     steps: [{
        //         simulatoטמקrName: "hello-world",
        //         command: {
        //             name: "Pasha"
        //         }
        //     }]
        // });

        // scenario.save();



        // const scenario: Scenario = {
        //     name: "Test",
        //     simulators: [{
        //         name: "hello-world",
        //         id: {
        //             imageName: "hello-world-simulator",
        //             version: "latest"
        //         }

        //     }],
        //     steps: [{
        //         simulatorName: "hello-world",
        //         command: {
        //             name: "Pasha"
        //         }
        //     }]
        // };
        // try {
        //     for (let i = 0; i < 1; i++) {
        //         const scenarioExecutor: ScenarioExecutor = new ScenarioExecutor(scenario);
        //         await scenarioExecutor.executeScenario();
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

//     }
//     )();





// }, 7000);

