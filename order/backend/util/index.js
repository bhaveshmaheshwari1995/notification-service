const kafka = require("./kafka");
const config = require('../../config')
const topicName = config.get('topicName')
logger = require('../../logger')

options = {"kafkaHost": config.get('kafkaHost')}

const kafkaClient = new kafka(options, logger)

module.exports = {
    writeToKafka: function (order) {
        kafkaClient.send(topicName, order).then((data)=> {
            console.log("Order sent to kafka %j", order)
        }).catch((err)=>{
            console.log("Error while sending to kafka %j", err)
        })
    }
}