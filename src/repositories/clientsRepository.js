import db from "../config/database.js";

function create (name, cpf, userId) {
    return db.query(
        `INSERT INTO clients (name, cpf, user_id) VALUES ($1, $2, $3) RETURNING id;`,
        [name, cpf, userId]
    );
}

function getByCpf (cpf) {
    return db.query(
        `SELECT * FROM clients WHERE cpf = $1;`,
        [cpf]
    );
}

function getByUserId (userId) {
    return db.query(
        `SELECT * FROM clients WHERE user_id = $1;`,
        [userId]
    );
}

export default {
    create,
    getByCpf,
    getByUserId
}