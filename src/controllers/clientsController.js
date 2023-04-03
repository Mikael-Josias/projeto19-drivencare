import clientsService from "../services/clientsService.js";

async function create (req, res, next) {
    try {
        const client = await clientsService.create(req.body);
        res.status(201).send(client);
    } catch (error) {
        next(error);
    }
}

export default {
    create
}