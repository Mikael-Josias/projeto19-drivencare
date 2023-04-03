import db from "../config/database.js";

function create ({cep, street, number, neighborhood, city, state}) {
    return db.query(
        `
        INSERT INTO address (cep, street, number, neighborhood, city, state)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
        `,
        [cep, street, number, neighborhood, city, state]
    )
}

export default {
    create
}