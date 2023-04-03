import db from "../config/database.js";

function create (email, password) {
    return db.query(
        `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id;`,
        [email, password]
    );
}

export default {
    create
}