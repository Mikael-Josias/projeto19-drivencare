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

function listByName (name, city) {
    return db.query(
        `
            SELECT d.*, s.name AS specialty, a.*
            FROM doctors AS d JOIN specialties AS s ON d.specialty_id = s.id
            JOIN address AS a ON d.address_id = a.id
            WHERE d.name LIKE '%' || $1 || '%' AND a.city LIKE '%' || $2 || '%';
        `,
        [name || "", city || ""]
    );
}

export default {
    create,
    getByEmail,
    getByUserId,
    listByName
}