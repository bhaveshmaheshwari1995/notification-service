var convict = require('convict');

// Define a schema
var config = convict({
    
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 8000,
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
        default: ["zookeeper details"],
        env:"KAFKA_HOST"
    },
    redisHost: {
        doc: "Redis host to be used",
        format: String,
        default: "localhost:6379",
        env:"REDIS_HOST"
    },
    twilioFromNumber: {
        doc: "Twilio from number",
        format: String,
        default: "",
        env:"TWILIO_FROM_PHONE"
    },
    twilioAccountSID: {
        doc: "Twilio account sid",
        format: String,
        default: "",
        env:"TWILIO_ACCOUNT_SID"
    },
    twilioAuthToken: {
        doc: "Twilio auth token",
        format: String,
        default: "",
        env:"TWILIO_AUTH_TOKEN"
    },
    mailSMTP: {
        doc: "mail smtp",
        format: String,
        default: "",
        env:"MAIL_SMTP"
    },
    mailSMTPPort: {
        doc: "mail smtp port",
        format: Number,
        default: 587,
        env:"MAIL_SMTP_PORT"
    },
    mailUser: {
        doc: "mail username",
        format: String,
        default: "",
        env:"MAIL_USER"
    },
    mailPassword: {
        doc: "mail password",
        format: String,
        default: "",
        env:"MAIL_PASSWORD"
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