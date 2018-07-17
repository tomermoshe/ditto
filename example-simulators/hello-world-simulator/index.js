var express = require('express');

var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.post("/command/SayHello", (req, res) => {
    console.log(`Hello ${process.env.greeting} ${req.body.name}`);
    res.status(200).send();
});


app.post("/ready", (req,res)=>{
    console.log(`ready called`);
    res.status(200).send();
})
app.listen(3000,()=>{
    console.log("started listening on port 3000");
    
});