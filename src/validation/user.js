import Joi from "joi";

const signupSchema = Joi.object({
    username: Joi.string().required().min(5).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
})

export { signinSchema, signupSchema }