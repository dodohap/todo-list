import { Router } from "express";
import { IRoutes } from "../interfaces/routes.interface";
import { ToDoController } from "../controllers/todo.controller";
import { ValidationMiddleware } from "../middlewares/validation.middlerware";
import { CreateTodoDto, TodoDto } from "../dto/todo.dto";
import { AuthMiddleware } from "../middlewares/auth.middlerware";

export class ToDoRoute implements IRoutes {
  public path = "/todo";
  public router = Router();
  public todoController = new ToDoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/all`,
      AuthMiddleware,
      this.todoController.getAllTodo
    );
    this.router.post(
      `${this.path}/create`,
      AuthMiddleware,
      ValidationMiddleware(CreateTodoDto),
      this.todoController.createTodo
    );
    this.router.delete(
      `${this.path}/delete/:id`,
      AuthMiddleware,
      this.todoController.deleteTodo
    );
    this.router.put(
      `${this.path}/update`,
      AuthMiddleware,
      ValidationMiddleware(TodoDto),
      this.todoController.updateTodo
    );
  }
}
