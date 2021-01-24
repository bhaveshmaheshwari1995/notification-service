var log = require('../../logger');
var util  = require('../util')

module.exports = {
    /**
     * @function notificationSubscribeHandler handler for notification subscribe 
     * @param Objet req,
     * @param Object res,
     * @return JSON response
     */
    notificationSubscribeHandler:function (req, res) {
        log.info("notification subscribe called with parameters body %j", req.body);
        console.log("notification subscribe called with parameters body %j", req.body);
    
        res.status(201).json(
            {
                code:201,
                data : "Notification Successfully Subscribed"
            }
        )
        util.writeToRedis(req.body)
    },

    /**
     * @function notificationUnsubscribeHandler  handler for notification subscribe
     * @param Objet req,
     * @param Object res,
     * @return JSON response
     */
    notificationUnsubscribeHandler:function (req, res) {
        log.info("notification subscribe called with parameters body %j", req.body);
        console.log("notification subscribe called with parameters body %j", req.body);
    
        res.status(201).json(
            {
                code:201,
                data : "Notification Successfully Unsubscribed"
            }
        )
        util.deleteFromRedis(req.body)
    }
}