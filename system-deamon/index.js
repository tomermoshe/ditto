var express = require("express");
var config = require("./config.json");
var execSh = require("exec-sh").promise;
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post("/start", async (req, res) => {
    try {
        var out = await execSh(config.start, true);
        res.status(200).send(out.stdout);
    }
    catch (e) {
        res.status(500).body(e);
    }
});



app.post("/stop", async (req, res) => {
    try {
        var out = await execSh(config.stop, true);
        res.status(200).send(out.stdout);
    }
    catch (e) {
        res.status(500).body(e);
    }
});

app.post("/config", async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        
        var out = await execSh(`${config.config} "${JSON.stringify(req.body)}"`, true);
        res.status(200).send(out.stdout);
    }
    catch (e) {
        res.status(500).body(e);
    }
});



app.listen(3000, () => console.log("App started on port 3000"));
