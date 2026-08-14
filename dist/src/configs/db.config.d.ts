import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
export declare const prisma: PrismaClient<{
    adapter: PrismaMariaDb;
}, never, import("@prisma/client/runtime/client").DefaultArgs>;
export declare function connectToDatabase(): Promise<void>;
//# sourceMappingURL=db.config.d.ts.map