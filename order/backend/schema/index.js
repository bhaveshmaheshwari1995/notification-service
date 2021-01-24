const Joi = require('joi');

module.exports = {
	Order: Joi.object({
        name: Joi.string().required(),
        qty: Joi.number().integer().min(0).required(),
        company: Joi.string().required()
    })
}