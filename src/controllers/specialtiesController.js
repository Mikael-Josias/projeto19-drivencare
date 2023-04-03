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

export default {
    create
}