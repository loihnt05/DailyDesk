import { defineConfig } from "drizzle-kit";
import getConfig from "@/lib/backend/config"

const config = getConfig();
export default defineConfig({
  out: "./drizzle",
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  driver: "pglite",
  dbCredentials: {
    url: config.databaseUrl,
  },
});
