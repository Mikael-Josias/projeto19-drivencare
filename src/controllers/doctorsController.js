import doctorsService from "../services/doctorsService.js";

async function create (req, res, next) {
    try {
        const id = await doctorsService.create(req.body);
        res.send({ id });
    } catch (error) {
        next(error);
    }
}

async function signIn (req, res, next) {
    try {
        const data = await doctorsService.signIn(req.body);
        res.status(201).send(data);
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    signIn
}