import doctorsService from "../services/doctorsService.js";

async function create (req, res, next) {
    try {
        const id = await doctorsService.create(req.body);
        res.send({ id });
    } catch (error) {
        next(error);
    }
}

export default {
    create
}