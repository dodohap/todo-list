import { Router } from "express";
import { IRoutes } from "../interfaces/routes.interface";
import { AuthController } from "../controllers/auth.controller";
import { ValidationMiddleware } from "../middlewares/validation.middlerware";
import { CreateUserDto } from "../dto/user.dto";
import { AuthMiddleware } from "../middlewares/auth.middlerware";
import {
  IsDefined,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

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
      this.authController.logOut
    );
  }
}

class AuthSignUpDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @MinLength(3)
  @MaxLength(16)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;
}

class AuthLogInDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @MinLength(3)
  @MaxLength(16)
  userName: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;
}
