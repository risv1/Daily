import { drizzle } from "drizzle-orm/postgres-js";
import { dbUrl } from "~~/env";
import postgres from "postgres";

const client = postgres(dbUrl);
export const db = drizzle(client);
