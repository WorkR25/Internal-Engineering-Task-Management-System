export interface IUserRepository {
    create(): Promise<void>;
    find(): Promise<void>;
    findAll(): Promise<void>;
    update(): Promise<void>;
    delete(): Promise<void>;
}
export declare class UserRepository implements IUserRepository {
    create(): Promise<void>;
    find(): Promise<void>;
    findAll(): Promise<void>;
    update(): Promise<void>;
    delete(): Promise<void>;
}
//# sourceMappingURL=user.repository.d.ts.map