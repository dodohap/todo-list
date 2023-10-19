import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { IUser } from "../interfaces/user.interface";

export class AuthController {
  private authService = new AuthService();

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: IUser = req.body;
      const signUpUserData: IUser = await this.authService.signUp(userData);

      res.status(201).json({ message: "singUpUser", data: signUpUserData });
    } catch (err) {
      next(err);
    }
  };

  public logIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: IUser = req.body;
      const { findUser } = await this.authService.logIn(userData);

      res.cookie("SESSION_ID", findUser.sessionId, {
        maxAge: 1200545345345345,
        httpOnly: true,
        sameSite: "none",
        secure: false,
      });
      res.cookie("USER_ID", findUser.id);
      findUser.password = "";
      findUser.sessionId = "";

      res.status(200).json({ message: "logIn ", data: findUser });
    } catch (err) {
      next(err);
    }
  };

  public logOut = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId: number = req.body.userId;
      const logOutUserData: IUser = await this.authService.logOut(userId);

      res.clearCookie("SESSION_ID");
      res.clearCookie("USER_ID");
      res.status(200).json({ message: "logOut", data: logOutUserData });
    } catch (err) {
      next(err);
    }
  };
}
