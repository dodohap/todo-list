import { Router } from "express";
import { IRoutes } from "../interfaces/routes.interface";
import { AuthController } from "../controllers/auth.controller";
import { ValidationMiddleware } from "../middlewares/validation.middlerware";
import { AuthMiddleware } from "../middlewares/auth.middlerware";
import { AuthLogInDto, AuthLogOutDto, AuthSignUpDto } from "../dto/auth.dto";

export class AuthRout implements IRoutes {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.router.post(
      `${this.path}/signup`,
      ValidationMiddleware(AuthSignUpDto),
      this.authController.signUp
    );
    this.router.post(
      `${this.path}/login`,
      ValidationMiddleware(AuthLogInDto),
      this.authController.logIn
    );
    this.router.post(
      `${this.path}/logout`,
      AuthMiddleware,
      ValidationMiddleware(AuthLogOutDto),
      this.authController.logOut
    );
  }
}
