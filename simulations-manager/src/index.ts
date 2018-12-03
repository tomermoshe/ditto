import express from "express";
import { json, urlencoded } from "body-parser";
import { TestRouter } from "./tests/testRouter";
import http from "http";
import { MongoConnector } from "./connectors/mongoConnector";
import { EnvironmentCleaner } from "./controllers/environmentCleaner";
import { SimulatorRouter } from "./simulators/simulatorsRouter";
import { EnvironmentRouter } from "./environments/environmentRouter";
import { ScenarioRouter } from "./scenarios/scenarioRouter";
import fileUpload from "express-fileupload";
require("./events/socketIoListener");
const app = express();

export const server = http.createServer(app);

(async () => {
    const mongoConnector: MongoConnector = new MongoConnector("mongodb://mongodb:27017/ditto");
    const environmentCleaner = new EnvironmentCleaner();
    environmentCleaner.initialize();
    await mongoConnector.connect();





    app.use(json());
    app.use(fileUpload({
        createParentPath: true
    }));
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
        res.setHeader("Access-Control-Allow-Credentials", "true");


        // Pass to next layer of middleware
        next();
    });

    app.use("/api", TestRouter.routes());

    app.use("/api", SimulatorRouter.routes());

    app.use("/api", EnvironmentRouter.routes());

    app.use("/api", ScenarioRouter.routes());
    app.listen(3000, () => {
        console.log("App started");

    });




})();



