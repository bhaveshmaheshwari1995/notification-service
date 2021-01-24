const { Kafka } = require('kafkajs')
const config = require('../../config')

class KafkaClient {
    constructor(){
        this.kafka = new Kafka({
            clientId: 'my-app',
            brokers: config.get('kafkaHost')      
        })
        this.producer = this.kafka.producer()
        this.consumer = this.kafka.consumer({ groupId: 'test-group' })
    }
    
    /**
    * send
    *
    * @param String topicName
    * @param {*} data to be sent
    * @return Promise
    */
    async send(topicName, data){
        await this.producer.connect()    
        await this.producer.send({
            topic: topicName,
            messages: [
                { value: JSON.stringify(data) },
            ],
        })
    }
    
    /**
    * createConsumer
    *
    * @param String topicName
    * @param {*} handler to received data 
    * @return Promise
    */
    async createConsumer(topicName, handler ){
        await this.consumer.connect()
        await this.consumer.subscribe({ topic: topicName})
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log("message received from kafka %s %s",topic, message.value)
                handler(message);
            },
        })
    }
}
module.exports = KafkaClient;
