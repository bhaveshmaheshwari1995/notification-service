const kafka = require("./kafka")
const redis = require("./redis")
const twilio = require("./twilio")
const mailer = require("./mailer");
const config = require('../../config')
const logger = require('../../logger')

const topicName = config.get('topicName')

kafkaOptions = {"kafkaHost": config.get('kafkaHost')}
redisOptions = {"hostPortString": config.get('redisHost')}

const kafkaClient = new kafka(kafkaOptions, logger)
const redisClient = new redis(redisOptions, logger)
const twilioClient = new twilio();
const mailerClient = new mailer();

module.exports = {
    writeToKafka: function (order) {
        kafkaClient.send(topicName, order).then((data)=> {
            logger.error("Order sent to kafka %j", order)
            console.log("Order sent to kafka %j", order, data)
        }).catch((err)=>{
            logger.error("Error while sending to kafka %j", err)
        })
    },

    handleNotificationFeed(){
        kafkaClient.createConsumer(topicName, feedHandler);
    },

    writeToRedis: function (user) {
        for(state of user.state) {
            storeUsertoRedis(state, user)
        }        
    },

    deleteFromRedis: function(user){
        for(state of user.state) {
            deleteUserFromRedis(state, user)
        }
    }
}

function storeUsertoRedis(state, user) {
    var key = `notification-${state}`;
    var field = user.name;
    var value = user;

    redisClient.hset(key, field, value).then((data)=> {
        logger.info("user detail saved to redis %j", key, value)
    }).catch((err)=>{
        logger.info("Error while sending to redis %j", err)
    })
}

function deleteUserFromRedis(state, user) {
    var key = `notification-${state}`;
    var field = user.name;

    redisClient.hdel(key, field, value).then((data)=> {
        logger.info("user detail deleted from redis %j", key, value)
    }).catch((err)=>{
        logger.info("Error while delete from redis %j", err)
    })
}

function createKafkaConsumer(){
    
    kafkaClient.createConsumer(topicName, feedHandler);

    // setTimeout(() => {
    //     feedHandler({
    //         value: '{"name":"phone","qty":3,"company":"WS Retails","state":"ACCEPTED"}'
    //     }) 
    // }, 10000);
}

function feedHandler(message) {
    console.log("Order received for notification %j", message);
    try {
        if (typeof message !== 'undefined') {
            var messageJsonObj = JSON.parse(message.value);
            logger.info("feedHandler(), Message received: %j", messageJsonObj);
            getUsersDetailsForState(messageJsonObj.state,messageJsonObj);
        }
    } catch (error) {
        logger.error("handleMessageDeviceState(), There has been an error while handling the command to the device." + error);
    }
}

async function getUsersDetailsForState(state,messageJsonObj) {
    var userDetails = await redisClient.hgetall(`notification-${state}`);
    Object.keys(userDetails).forEach(function(user) {
        sendNotification(userDetails[user], messageJsonObj)
    });
}

function sendNotification(user, messageJsonObj) {
    let userObj = JSON.parse(user);
    for(mode of userObj.mode) {
        if(mode == "SMS") {
            console.log("send Message to %s on  %s", userObj.name, userObj.mobileno);
            twilioClient.send(userObj, messageJsonObj)
        } else if(mode == "EMAIL") {
            console.log("send mail to %s on  %s", userObj.name, userObj.email);
            mailerClient.send(userObj, messageJsonObj)
        }
    }    
}