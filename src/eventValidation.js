const Joi = require('joi');

const eventSchema = Joi.object({
    type: Joi.string().required(),
    timestamp: Joi.string().isoDate().required(),
});

const validateEvent = (req, res, next) => {
    const { error } = eventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateEvent;
