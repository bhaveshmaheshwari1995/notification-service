var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require("./config")
app.use(bodyParser.json());

var log = require('./logger');

var port = config.get('port');

//configure various routes
var orderRouter = require('./backend/orders');

app.get("/",(req, res) => res.send("Thanks for checking"));

app.use("/v1/order", orderRouter);

app.listen(port, () => console.log("App started on " + port));