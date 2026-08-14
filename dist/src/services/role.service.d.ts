import type { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto.js';
export declare class RoleService {
    create(data: CreateRoleDto): import("@prisma/client").Prisma.Prisma__RoleClient<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-mariadb").PrismaMariaDb;
    }>;
    find(id: bigint): import("@prisma/client").Prisma.Prisma__RoleClient<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-mariadb").PrismaMariaDb;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    update(id: bigint, data: UpdateRoleDto): import("@prisma/client").Prisma.Prisma__RoleClient<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        adapter: import("@prisma/adapter-mariadb").PrismaMariaDb;
    }>;
    delete(id: bigint): import("@prisma/client").Prisma.Prisma__RoleClient<{
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