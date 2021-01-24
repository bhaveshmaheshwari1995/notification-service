var express = require("express");
var router = express.Router();
var controller = require("./controller");
const schema = require("../schema")

router.use('/subscribe', subscribeValidateRequest);
router.use('/unsubscribe', unsubscribeValidateRequest);

app.get("/",(req, res) => res.send("Thanks for checking"));

router.post("/subscribe", controller.notificationSubscribeHandler);
router.post("/unsubscribe", controller.notificationUnsubscribeHandler);

function subscribeValidateRequest(req, res, next) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.Subscribe.validate(req.body, options);
    if (error) {
        console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(400).send({ success: false, error: "Bad Request" , message: `Validation error: ${error.details.map(x => x.message).join(', ')}`});
    } else if( (value.mode.indexOf("SMS") != -1 && !value.mobileno ) || (value.mode.indexOf("EMAIL") != -1 && !value.email) ){
        res.status(400).send({ success: false, error: "Bad Request" , message: `combination of sms/email and mobileno/email is not vaild`});
    } else {
        if(!value.state){
            value.state = ["ACCEPTED", "INPROGRESS", "CANCELLED", "DELIVERED","NOT DELIVERED"];
        }
        req.body = value;
        next();
    }
}

function unsubscribeValidateRequest(req, res, next) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.UnSubscribe.validate(req.body, options);
    if (error) {
        console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(400).send({ success: false, error: "Bad Request" , message: `Validation error: ${error.details.map(x => x.message).join(', ')}`});
    } else {
        if(!value.state){
            value.state = ["ACCEPTED", "INPROGRESS", "CANCELLED", "DELIVERED","NOT DELIVERED"];
        }
        req.body = value;
        next();
    }
}

module.exports = router;
