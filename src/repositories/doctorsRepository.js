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

function getByUserId (userId) {
    return db.query(
        `SELECT * FROM doctors WHERE user_id = $1;`,
        [userId]
    );
}

export default {
    create,
    getByEmail,
    getByUserId
}