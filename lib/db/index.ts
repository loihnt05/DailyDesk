import { drizzle } from 'drizzle-orm/pglite';

const db = drizzle(process.env.DATABASE_URL!);

export default db;