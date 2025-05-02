// import { drizzle } from "drizzle-orm/mysql2";
// export const db = drizzle(process.env.DATABASE_URL);

import mysql from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

// Create MySQL connection using connection string
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Pass it to drizzle
export const db = drizzle(connection);
