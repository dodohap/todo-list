import { Router } from "express";
import { IRoutes } from "../interfaces/routes.interface";
import { UserController } from "../controllers/user.controller";
import { TodoDto } from "../dto/todo.dto";
import { ValidationMiddleware } from "../middlewares/validation.middlerware";
import { AuthMiddleware } from "../middlewares/auth.middlerware";

export class UserRoute implements IRoutes {
  public path = "/user";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.userController.getAllUsers);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(TodoDto),
      this.userController.createUser
    );
    this.router.delete(
      `${this.path}/delete/:id`,
      this.userController.deleteUser
    );
    this.router.put(
      `${this.path}/update/:id`,
      ValidationMiddleware(TodoDto),
      this.userController.updateUser
    );
    this.router.post(
      `${this.path}/todolist/:id`,
      AuthMiddleware,
      this.userController.getUserTodoList
    );
  }
}
