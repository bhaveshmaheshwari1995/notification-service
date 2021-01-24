var bunyan = require('bunyan');
var config = require('../config');

const LOG_LEVEL = config.get('logLevel');
const LOG_PATH = config.get('logPath');
const LOG_MAX_LIFE = config.get('logMaxLife');


/*
*this bunyan logger will create logs on per day
*rotation basis and keep the records for last 5 days
*/
var log = bunyan.createLogger({
    name:'app-logger',
    streams: [{
        level: LOG_LEVEL,
        type: 'rotating-file',
        path: LOG_PATH,
        period: '1d',   // daily rotation
        count: LOG_MAX_LIFE        // maximum log life
    }]
});

module.exports = log;