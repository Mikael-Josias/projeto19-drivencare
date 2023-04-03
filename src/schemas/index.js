import Joi from "joi";

const specialtySchema = Joi.object({
    name: Joi.string().max(100).required()
});

const doctorsSignUpSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().max(100).email().required(),
    password: Joi.string().min(6).required(),
    specialty_id: Joi.number().integer().positive().required(),
    address: Joi.object({
        cep: Joi.string().length(8).required(),
        street: Joi.string().max(100).required(),
        number: Joi.number().integer().positive().required(),
        neighborhood: Joi.string().max(100).required(),
        city: Joi.string().max(100).required(),
        state: Joi.string().max(100).required()
    }).required()
});

const clientSignUpSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().max(100).email().required(),
    password: Joi.string().min(6).required(),
    cpf: Joi.string().length(11).required()
});

export default {
    specialtySchema,
    doctorsSignUpSchema,
    clientSignUpSchema
}