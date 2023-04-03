import db from "../config/database.js";

function create (name) {
    return db.query(
        `INSERT INTO specialties (name) VALUES ($1) RETURNING id;`,
        [name]
    );
}

function getByName (name) {
    return db.query(
        `SELECT * FROM specialties WHERE name = $1;`,
        [name]
    );
}

export default {
    create,
    getByName
}