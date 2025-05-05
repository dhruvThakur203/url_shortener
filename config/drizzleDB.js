// import { drizzle } from "drizzle-orm/mysql2";
// export const db = drizzle(process.env.DATABASE_URL);

// import mysql from "mysql2";
// import { drizzle } from "drizzle-orm/mysql2";
// import dotenv from "dotenv";

// dotenv.config(); // Load .env file

// // Create MySQL connection using connection string
// const connection = mysql.createConnection(process.env.DATABASE_URL);

// // Pass it to drizzle
// export const db = drizzle(connection);

// import { drizzle } from "drizzle-orm/mysql2";
// export const db = drizzle(process.env.DATABASE_URL);

import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
});

export const db = drizzle(connection);
