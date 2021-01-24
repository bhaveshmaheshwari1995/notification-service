var Redis = require('ioredis');

class RedisClient {

    constructor (options, logger){
        this.logger = logger;

        const hostPortTokens = options.hostPortString.split(':');
        this.connection = new Redis({
            host: hostPortTokens[0],
            port: hostPortTokens[1]
        });
    }
    
    /**
     * Gets the value for the given key
     *
     * @param String key
     * @return Promise
     */
    get (key) {
        return new Promise(function (resolve, reject) {
            this.connection.get(key).then(function (response) {
                resolve(parseResponse(response));
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    /**
     * Sets the given value for the given key
     *
     * @param String key
     * @param mixed value
     * @return Promise
     */
    set (key, value, ttl) {
        return new Promise(function (resolve, reject) {
            this.connection.set(key, buildCacheValue(value)).then(function (response) {
                if (ttl) {
                    this.connection.expire(key, ttl);
                }
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    delete (key) {
        return new Promise(function (resolve, reject) {
            this.connection.del(key, function (err, numRemoved) {
                if (!err) {
                    resolve(numRemoved);
                } else {
                    reject(err);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    /**
     * Gets the value for the given hash key
     *
     * @param String key
     * @return Promise
     */
    hget (key, field) {
        return new Promise(function (resolve, reject) {
            this.connection.hget(key, field).then(function (response) {
                resolve(parseResponse(response));
            }).catch(function (error) {
                reject(error);
            });
        });
    }
    
    /**
     * Sets the given value for the given hash key
     *
     * @param String key
     * @param mixed value
     * @return Promise
     */
    hset (key, field, value, ttl) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.connection.hset(key, field, buildCacheValue(value)).then(function (response) {
                if (ttl) {
                    this.connection.expire(key, ttl);
                }
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    hdel (key, field) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.connection.hdel(key, field, function (err, numRemoved) {
                if (!err) {
                    resolve(numRemoved);
                } else {
                    reject(err);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    hgetall (key) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.connection.hgetall(key ,function (err, response) {
                if(err){
                    log.error("There has been an error while getting active commands from redis. %j", err);
                    reject(err);
                } else {
                    resolve(parseResponse(response));
                }
            })
            // .hdel(key, field, function (err, numRemoved) {
            //     if (!err) {
            //         resolve(numRemoved);
            //     } else {
            //         reject(err);
            //     }
            // }).catch(function (error) {
            //     reject(error);
            // });
        });
    }
}

/**
 * Parses the response returned by the cache
 * @param {*} value
 * @return {*}
 */
function parseResponse(response) {
    let parsedResposne = null;
    if (response instanceof Array) {
        parsedResposne = [];
        response.forEach(function (element) {
            parsedResposne.push(parseResponseElement(element));
        });
        return parsedResposne;
    } else {
        return parseResponseElement(response);
    }
}

/**
 * Parses single element returned by the cache
 * @param {*} value
 * @return {*}
 */
function parseResponseElement(value) {
    try {
        if (value) {
            value = JSON.parse(value);
        }
    } catch (error) {

    }

    return value;
}

/**
 * Builds the cache value
 *
 * @param {*} value
 * @return {*}
 */
function buildCacheValue(value)
{
    if (value) {
        value = JSON.stringify(value);
    }
    return value;
}



module.exports = RedisClient