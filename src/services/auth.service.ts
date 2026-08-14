import { IUserRepository } from "../repositories/user.repository.js";

export interface IAuthService {
    signup(): Promise<void>
    signin(): Promise<void>
}

export class AuthService implements IAuthService {
    constructor(_userRepository: IUserRepository) {
    }

    async signup(): Promise<void> {
        
    }

    async signin(): Promise<void> {
        
    }
}
