import { NotimplementedError } from "../utils/errors/app.error.js";
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signupHandler(_req, _res, next) {
        await this.authService.signup();
        next(new NotimplementedError('Signup is not implemented yet'));
    }
    async signinHandler(_req, _res, next) {
        await this.authService.signin();
        next(new NotimplementedError('Signin is not implemented yet'));
    }
}
//# sourceMappingURL=auth.controller.js.map