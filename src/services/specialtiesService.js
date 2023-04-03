import specialtiesRepository from "../repositories/specialtiesRepository.js";
import errors from "../errors/index.js";

async function create (name) {
    const {rowCount: specialtiesExists} = await specialtiesRepository.getByName(name);
    if (specialtiesExists !== 0) throw errors.duplicateSpecialtiesError(name);
    const {rows: [id]} = await specialtiesRepository.create(name);
    return id;
}

export default {
    create
}