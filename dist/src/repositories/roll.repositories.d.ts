export declare class RoleRepository {
    create(data: any): Promise<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    find(id: bigint): Promise<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findAll(): Promise<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    update(id: bigint, data: any): Promise<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: bigint): Promise<{
        id: bigint;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=roll.repositories.d.ts.map