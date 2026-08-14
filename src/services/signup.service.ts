import bcrypt from "bcrypt";
import { SignupRepository } from "../repositories/signup.repository.js";
import { SignupRequestDto } from "../dtos/signup.dto.js";
import { ConflictError } from "../utils/errors/app.error.js";

export interface SignupServiceResult {
    id: bigint;
    fullName: string;
    email: string;
    roleId: bigint;
}

export class SignupService {
    private readonly signupRepository: SignupRepository;
    private readonly saltRounds = 10;

    constructor(signupRepository: SignupRepository = new SignupRepository()) {
        this.signupRepository = signupRepository;
    }

    async register(payload: SignupRequestDto): Promise<SignupServiceResult> {
        const userExists = await this.signupRepository.checkUserExists(payload.email);
        if (userExists) {
            throw new ConflictError(`User with email ${payload.email} already exists`);
        }

        const passwordHash = await bcrypt.hash(payload.password, this.saltRounds);

        const user = await this.signupRepository.createUser({
            fullName: payload.fullName,
            email: payload.email,
            passwordHash,
            roleId: BigInt(payload.roleId)
        });

        return user;
    }
}
