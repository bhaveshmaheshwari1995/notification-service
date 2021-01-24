var express = require("express");
var router = express.Router();
var controller = require("./controller");
const schema = require("../schema")

router.use('/v1/order', validateRequest);

router.get("/", controller.getHandler);
router.post("/submit", controller.orderHandler);

function validateRequest(req, res, next) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.Order.validate(req.body, options);
    if (error) {
        console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(400).send({ success: false, error: "Bad Request" , message: `Validation error: ${error.details.map(x => x.message).join(', ')}`});
    } else {
        req.body = value;
        next();
    }
}

module.exports = router;
