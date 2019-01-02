var express = require('express');

var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/ready", (req, res) => {
    console.log(`ready called`);
    res.status(200).send();
})

app.post("/command/OrderTaxi", (req, res) => {
    const coordinate = req.body.coordinate;
    console.log(`Taxi server ip is ${process.env.taxiServerIp}`);

    console.log(`${coordinate}`);
    res.status(200).send();
});


app.listen(3000, () => {
    console.log("started listening on port 3000");

});