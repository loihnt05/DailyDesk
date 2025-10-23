import { drizzle } from 'drizzle-orm/pglite';
import getConfig from '@/lib/backend/config';
const config = getConfig();

const db = drizzle(config.databaseUrl);

export default db;