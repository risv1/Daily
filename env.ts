if (!process.env.DB_URL) {
  throw new Error("DB_URL is not set in .env file");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in .env file");
}

export const dbUrl = process.env.DB_URL;
export const jwtSecret = process.env.JWT_SECRET;
