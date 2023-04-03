import db from "../config/database.js";

function create (name, userId, addressId, specialtyId) {
    return db.query(
        `
        INSERT INTO doctors (name, user_id, address_id, specialty_id)
        VALUES ($1, $2, $3, $4) RETURNING id;
        `,
        [name, userId, addressId, specialtyId]
    );
}

function getByEmail (email) {
    return db.query(
        `SELECT * FROM users WHERE email = $1;`,
        [email]
    );
}

export default {
    create,
    getByEmail
}