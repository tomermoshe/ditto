import express from "express";
import { json, urlencoded } from "body-parser";
import { ScenarioRouter } from "./routes/scenarioRouter";
import http from "http";
import { MongoConnector } from "./connectors/mongoConnector";
import { dockerode } from "./connectors/dockerodeConnector";
import { EnvironmentCleaner } from "./controllers/environmentCleaner";
import { SimulatorRouter } from "./routes/simulatorsRouter";



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
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

        // Request methods you wish to allow
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

        // Request headers you wish to allow
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader("Access-Control-Allow-Credentials", "http://localhost:3000");

        // Pass to next layer of middleware
        next();
    });

    app.use("/api", ScenarioRouter.routes());

    app.use("/api", SimulatorRouter.routes());

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

