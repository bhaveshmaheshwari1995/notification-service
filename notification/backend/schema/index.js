const Joi = require('joi');

module.exports = {
    Subscribe: Joi.object({
        name: Joi.string().required(),
        state: Joi.array().items(Joi.string().valid("ACCEPTED", "INPROGRESS", "CANCELLED", "DELIVERED","NOT DELIVERED")).min(1),
        mode: Joi.array().items(Joi.string().valid("EMAIL", "SMS")).min(1),
        mobileno: Joi.string().allow(null),
        email: Joi.string().email().allow(null)
        
    }),
    UnSubscribe: Joi.object({
        name: Joi.string().required(),
        state: Joi.array().items(Joi.string().valid("ACCEPTED", "INPROGRESS", "CANCELLED", "DELIVERED","NOT DELIVERED")).min(1)
    }),
}