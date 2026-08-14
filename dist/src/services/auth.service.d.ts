import { IUserRepository } from "../repositories/user.repository.js";
export interface IAuthService {
    signup(): Promise<void>;
    signin(): Promise<void>;
}
export declare class AuthService implements IAuthService {
    constructor(_userRepository: IUserRepository);
    signup(): Promise<void>;
    signin(): Promise<void>;
}
//# sourceMappingURL=auth.service.d.ts.map