import type { Prisma } from '@prisma/client';
export declare class RoleService {
    create(data: Prisma.RoleCreateInput): Prisma.Prisma__RoleClient<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-mariadb").PrismaMariaDb;
    }>;
    find(id: bigint): Prisma.Prisma__RoleClient<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-mariadb").PrismaMariaDb;
    }>;
    findAll(): Prisma.PrismaPromise<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    update(id: bigint, data: Prisma.RoleUpdateInput): Prisma.Prisma__RoleClient<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-mariadb").PrismaMariaDb;
    }>;
    delete(id: bigint): Prisma.Prisma__RoleClient<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-mariadb").PrismaMariaDb;
    }>;
}
//# sourceMappingURL=role.service.d.ts.map