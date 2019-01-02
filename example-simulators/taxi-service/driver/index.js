var express = require('express');

var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/ready", (req, res) => {
    console.log(`ready called`);
    res.status(200).send();
});

app.post("/command/ChangeLocation", (req, res) => {
    const coordinate = req.body.coordinate;
    console.log(`Changing location to ${coordinate.lat},${coordinate.lon}`);
    res.status(200).send();
});

app.post("/command/ExpectClient", (req, res) => {
    const coordinate = req.body.coordinate;
    if(coordinate.lat === "41.40338"){
        res.status(200).send();
    }else{
        res.status(500).send("I got no client at this coordinates")
    }
});




app.listen(3000, () => {
    console.log("started listening on port 3000");

});