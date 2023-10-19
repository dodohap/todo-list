import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { ITodo } from "../interfaces/todo.intereface";

export class UserController {
  private userService = new UserService();

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users: IUser[] = await this.userService.getAllUsers();

      res.status(200).json({ data: users, message: "getAllUsers" });
    } catch (err) {
      next(err);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: IUser = req.body;
      const createUserData: IUser = await this.userService.createUser(userData);

      res.status(200).json({ data: createUserData, message: "createUser" });
    } catch (err) {
      next(err);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId: number = Number(req.params.id);
      const deleteUserData: IUser = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: "deleteUser" });
    } catch (err) {
      next(err);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId: number = Number(req.params.id);
      const userData: IUser = req.body;
      const updateUser: IUser = await this.userService.updateUser(
        userId,
        userData
      );

      res.status(200).json({ data: updateUser, message: "updateUser" });
    } catch (err) {
      next(err);
    }
  };

  public getUserTodoList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId: number = Number(req.params.id);
      const userTodoList: ITodo[] = await this.userService.getUserTodoList(
        userId
      );

      res.status(200).json({ data: userTodoList, message: "updateUser" });
    } catch (err) {
      next(err);
    }
  };
}
