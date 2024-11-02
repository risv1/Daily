import { defineConfig } from "drizzle-kit";
import { dbUrl } from "./env";

export default defineConfig({
  schema: "server/database/schema.ts",
  out: ".drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
  },
  strict: true,
  verbose: true,
});
