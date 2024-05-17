import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema/schema.ts",
  dialect: "postgresql",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
});
