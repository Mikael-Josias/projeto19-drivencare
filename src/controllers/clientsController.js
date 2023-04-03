import clientsService from "../services/clientsService.js";

async function create (req, res, next) {
    try {
        const client = await clientsService.create(req.body);
        res.status(201).send(client);
    } catch (error) {
        next(error);
    }
}

async function signIn (req, res, next) {
    try {
        const data = await clientsService.signIn(req.body);
        res.status(201).send(data);
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    signIn
}