var convict = require('convict');

// Define a schema
var config = convict({
    
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 8080,
        env: "PORT",
        arg: "port"
    },
    topicName: {
        doc:"topic name that to be used",
        format: String,
        default: "test-notification",
        env:"Topic_NAME",
    },
    kafkaHost: {
        doc: "Kafka host to be used",
        format: Object,
        default: [""],
        env:"KAFKA_HOST"
    },
    logLevel: {
        doc: "log level for logging",
        format: String,
        default: "debug",
        env: "LOG_LEVEL"
    },
    logPath: {
        doc: "folder to be used for logging",
        format: String,
        default: "/var/log/app-sample.log",
        env: "LOG_PATH"
    },
    logMaxLife: {
        doc: "folder to be used for logging",
        format: Number,
        default: 5,
        env: "LOG_MAX_LIFE"
    },
});

module.exports = config;