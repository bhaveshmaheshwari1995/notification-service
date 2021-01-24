var log = require('../../logger');
var util  = require('../util')

module.exports = {
    /**
     * @function orderHandler get the list of users
     * @param Objet req,
     * @param Object res,
     * @return JSON response
     */
    orderHandler:function (req, res) {
        log.info("Post Orders called with parameters body %j", req.body);
        console.log("Post Orders called with parameters body %j", req.body);
    
        res.status(201).json(
            {
                code:201,
                data : "Order Accepted Successfully"
            }
        )
        handleOrderState(req.body);
    },
        /**
     * @function getHandler get the list of users
     * @param Objet req,
     * @param Object res,
     * @return String
     */
    getHandler:function (req, res) {
        res.send("Use Post call to submit orders")
    }
}

function handleOrderState(order) {
    console.log("handleOrderState, order %j", order)
    let stateGetter = getNextOrderState();
    processNextState(order, stateGetter)
}

function processNextState(order, stateGetter){
    let state = stateGetter.next()

    setTimeout(() => {
        order.state = state.value;
        writeToKafka(order)
        if(!state.done) {
            processNextState(order, stateGetter)
        }
    }, 5000)
}

function writeToKafka(order) {
    console.log("writeToKafka %j", order)
    util.writeToKafka(order);
}

function* getNextOrderState() {
    yield "ACCEPTED";
    yield "INPROGRESS";
    // yield "CANCELLED";
    return "DELIVERED";
    // return "NOT DELIVERED";
}  
