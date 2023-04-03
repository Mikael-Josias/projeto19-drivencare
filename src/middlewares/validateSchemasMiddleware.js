import errors from "../errors/index.js";

export default function validateSchemasMiddleware(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            throw errors.conflictError(errorMessages);
        }

        next();
    }
}