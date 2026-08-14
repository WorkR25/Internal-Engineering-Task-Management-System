import bcrypt from "bcrypt";
import { IUserRepository } from "../repositories/user.repository.js";
import { IRoleRepository } from "../repositories/role.repository.js";
import type { SignupDto } from "../dtos/auth.dto.js";

export interface IAuthService {
    signup(data: SignupDto): Promise<void>;
    signin(): Promise<void>;
}

export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;
    private readonly roleRepository: IRoleRepository;

    constructor(
        userRepository: IUserRepository,
        roleRepository: IRoleRepository
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    async signup(data: SignupDto): Promise<void> {

        // Check whether email  exists from earlier or nt
        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new Error("User already exists");
        }

        // here i    Find role frm Roles table
        const role = await this.roleRepository.findByName(data.roleName);

        if (!role) {
            throw new Error("Role not found");
        }

        // Hash password
        const passwordHash = await bcrypt.hash(data.password, 10);

        // create user with Role tables id
        await this.userRepository.create(
            data.fullName,
            data.email,
            passwordHash,
            role.id
        );
    }

    async signin(): Promise<void> {
        
    }
}