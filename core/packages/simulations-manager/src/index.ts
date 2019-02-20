import express, { Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import { TestRouter } from "./tests/TestRouter";
import http from "http";
import { MongoConnector } from "./connectors/MongoConnector";
import { EnvironmentCleaner } from "./controllers/EnvironmentCleaner";
import { SimulatorRouter } from "./simulators/SimulatorsRouter";
import { EnvironmentRouter } from "./environments/EnvironmentRouter";
import { ScenarioRouter } from "./scenarios/ScenarioRouter";
import fileUpload from "express-fileupload";
import SocketIoConnector from "./connectors/SocketIoConnector";
import "./environments/NetworksPool";

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", err => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });

const app = express();

const server = http.createServer(app);

(async () => {
    const mongoConnector: MongoConnector = new MongoConnector("mongodb://mongodb:27017/ditto");
    const socketIoConnector = new SocketIoConnector(server);
    socketIoConnector.connect();
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
    app.get("/healthcheck", (request: express.Request, response: express.Response) => {
        response.send(200);
    });

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader("Access-Control-Allow-Origin", "*");

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
    app.use(function (err: any, req: any, res: any, next: any) {

    });

    app.use("/api", TestRouter.routes());

    app.use("/api", SimulatorRouter.routes());

    app.use("/api", EnvironmentRouter.routes());

    app.use("/api", ScenarioRouter.routes());



    app.use(function (err: any, req: Request, res: Response, next: any) {
        res.status(err.status || 500).send();
    });

    app.listen(3000, () => {
        console.log("App started");

    });




})();



