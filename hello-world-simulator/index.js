var express = require('express');

var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.post("/command", (req, res) => {
    console.log(`Hello ${req.body.name}`);
    res.status(200).send();
});

app.listen(3000);