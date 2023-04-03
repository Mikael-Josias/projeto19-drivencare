import Joi from "joi";

const specialtySchema = Joi.object({
    name: Joi.string().max(100).required()
});

export default {
    specialtySchema
}