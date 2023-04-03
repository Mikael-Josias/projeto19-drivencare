import specialtiesService from "../services/specialtiesService.js";

async function create (req, res, next) {
    try {
        const { name } = req.body;
        const data = await specialtiesService.create(name);
        res.send({data});
    } catch (err) {
        next(err);
    }
}

async function getAll (req, res, next) {
    try {
        const {rows: data} = await specialtiesService.getAll();
        res.send(data);
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    getAll
}