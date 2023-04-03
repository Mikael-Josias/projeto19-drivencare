import db from "../config/database.js";

function create (userId) {
    return db.query(
        `INSERT INTO sessions (user_id) VALUES ($1) RETURNING id;`,
        [userId]
    );
}

export default {
    create
}