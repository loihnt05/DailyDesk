export type Config = {
  databaseUrl: string;
};
export default function getConfig(): Config {
  return {
    databaseUrl: process.env.DATABASE_URL || "./tmp/pglite-data",
  };
}
