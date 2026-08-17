import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/user.repository.js";
import { SigninDto } from "../dtos/user.dto.js";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async signin(data: SigninDto) {
    // Find user by email
    const user = await this.userRepository.findByEmail(
      data.email
    );

    // User not found
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare entered password with stored password hash
    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    // Invalid password
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // JWT secret
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    // JWT payload
    const payload = {
      userId: user.id.toString(),
      email: user.email,
      roleId: user.roleId.toString(),
    };

    // Generate JWT
    const accessToken = jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    // Remove passwordHash from response
    const {
      passwordHash: _passwordHash,
      ...userWithoutPassword
    } = user;

    return {
      accessToken,
      user: userWithoutPassword,
    };
  }
}