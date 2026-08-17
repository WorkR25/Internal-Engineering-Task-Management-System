import jwt from "jsonwebtoken";

import { IUserRepository } from "../repositories/user.repository.js";
import { SigninDto } from "../dtos/user.dto.js";
import { comparePassword } from "../utils/helpers/password.helper.js";
import { JWT_SECRET } from "../configs/server.config.js";

export interface IAuthService {
  signin(data: SigninDto): Promise<string>;
}

export class AuthService implements IAuthService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async signin(data: SigninDto): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
      data.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      {
        id: user.id.toString(),
        email: user.email,
      },
      JWT_SECRET!
    );

    return token;
  }
}