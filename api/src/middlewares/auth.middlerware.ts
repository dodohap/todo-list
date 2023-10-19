import { NextFunction, Request, Response } from "express";
import { databaseUsersTabel } from "../database/db";
import { HttpException } from "../exeptions/http.exception";
import { IUser } from "../interfaces/user.interface";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["SESSION_ID"];
    const userId = req.cookies["USER_ID"];

    const findUser: IUser = await databaseUsersTabel()
      .where("id", "=", userId)
      .first();

    if (!findUser) throw new HttpException(409, "Cannot find user!");

    if (token !== findUser.sessionId)
      throw new HttpException(409, "Wrong auth!");

    next();
  } catch (err) {
    next(err);
  }
};
