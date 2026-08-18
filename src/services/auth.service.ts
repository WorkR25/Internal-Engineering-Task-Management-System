import { SignInDto, UpdatePasswordDto } from "../dtos/auth.dto.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { BadRequestError } from "../utils/errors/app.error.js";
import { comparePassword } from "../utils/helpers/password.helper.js";
import { signToken } from "../utils/helpers/jwt.helper.js";
import { AuthUser, SafeUserWithRole, UserWithRole } from "../types/auth.type.js";
export interface IAuthService {
  signIn(data: SignInDto): Promise<string>;
  getCurrentUserDetils(user: AuthUser): Promise<SafeUserWithRole>;
  updatePassword(user: AuthUser, data: UpdatePasswordDto): Promise<void>;
  logout(): Promise<void>;
}
export class AuthService implements IAuthService {
    private readonly userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    async signIn(data: SignInDto): Promise<string> {
        const user: UserWithRole | null = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new BadRequestError("User not exist");
        }
        const isPasswordValid = await comparePassword(
            data.password,
            user.passwordHash
        );
        if (!isPasswordValid) {
            throw new BadRequestError("Invalid password");
        }
        const token: string = signToken({
          userId: user.id.toString(),
          role: user.role.name
        });
        return token;
    }
    async getCurrentUserDetils(user: AuthUser): Promise<SafeUserWithRole> {
        const userData: SafeUserWithRole | null = await this.userRepository.getUserDetails(user.userId);
        if (!userData) {
            throw new BadRequestError("User not found");
        }
        return userData;
    }
    async updatePassword(user: AuthUser, data: UpdatePasswordDto): Promise<void> {
        const userData = await this.userRepository.findById(user.userId);
        if (!userData) {
            throw new BadRequestError("User not found");
        }
        const isPasswordValid = await comparePassword(data.oldPassword, userData.passwordHash);
        if (!isPasswordValid) {
            throw new BadRequestError("Current password is incorrect");
        }
        await this.userRepository.updatePassword(user.userId, data.newPassword);
    }
    async logout(): Promise<void> {
        // Logout logic can be handled on client side by removing token
        return Promise.resolve();
    }
}