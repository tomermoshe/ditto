var express = require('express');
var DittoRouter = require("./ditto");
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 



app.use(DittoRouter.routes());


app.listen(3000, () => {
    console.log("started listening on port 3000");

});