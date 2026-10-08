// api/_db.ts

import { config } from "dotenv";
import postgres from "postgres";

if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.local" });
  config();
}

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or POSTGRES_URL is missing in environment variables");
}

const isProd = process.env.NODE_ENV === "production";

declare global {
  var _postgresSql: ReturnType<typeof postgres> | undefined;
}

if (!global._postgresSql) {
  global._postgresSql = postgres(connectionString, {
    ssl: isProd ? "require" : "allow",
    max: 1,
    idle_timeout: 30,
    connect_timeout: 10,
  });
}

export const sql = global._postgresSql;
