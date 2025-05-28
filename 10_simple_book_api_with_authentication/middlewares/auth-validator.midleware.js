const Joi = require("joi");

const signUpSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]+$")),
    email: Joi.string()
        .min(6)
        .max(30)
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]+$"))
});

const signInSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(30)
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]+$"))
});

module.exports = { 
    signUpSchema,
    signInSchema, 
};