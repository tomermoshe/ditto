var express = require("express");
var Router = express.Router;

class DittoRouter {
    static routes() {
        return Router()
            .get("/ready", (req, res) => {
                //TODO: Add your ready logic here
                console.log(`ready called`);
                res.status(200).send();
            })
            .post("/command/SayHello", (req, res) => {
                const { body } = req;
                console.log(`Hello ${body.greeting} ${body.name}`);
                res.status(200).send();
            })
            .post("/command/SayGoodbye", (req, res) => {
                const { body } = req;
                console.log(`Goodbye ${body.greeting} ${body.name}`);
                res.status(200).send();
            });
    }
}
module.exports = DittoRouter;