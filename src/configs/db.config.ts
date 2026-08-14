import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } from './server.config.js';
import { logger } from './logger.config.js';

const adapter = new PrismaMariaDb({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD
});

export const prisma = new PrismaClient({
    adapter
});

export async function connectToDatabase() {
    try {
        await prisma.$connect();
        logger.info('Database connected successfully');
    } catch (error) {
        logger.error('Database connection failed', { error });
        process.exit(1);
    }
}
