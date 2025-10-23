import { defineConfig, Config } from "drizzle-kit";
import getConfig from "@/lib/backend/config";
import { isValidUri } from "@/lib/utils";

const config = getConfig();
const drizzleConfig: Config = {
  out: "./drizzle",
  schema: "./lib/backend/db/schema.ts",
  dialect: "postgresql",
  driver: isValidUri(config.databaseUrl) ? undefined : "pglite",
  dbCredentials: {
    url: config.databaseUrl,
  },
}

export default defineConfig(drizzleConfig);
