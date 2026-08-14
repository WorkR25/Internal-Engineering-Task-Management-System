import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../configs/server.config.js";

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};