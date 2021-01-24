var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require("./config")
var util = require('./backend/util')

app.use(bodyParser.json());

var log = require('./logger');

var port = config.get('port');

//configure various routes
var notificationRouter = require('./backend/notification');

app.get("/",(req, res) => res.send("Thanks for checking"));

app.use("/v1/notification", notificationRouter);

app.listen(port, () => console.log("App started on " + port));

util.handleNotificationFeed();

module.exports = app;