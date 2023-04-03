import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const DBConfig = {
    connectionString: process.env.DATABASE_URL
}

export default new Pool(DBConfig);