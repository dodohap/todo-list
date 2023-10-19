import { TodoService } from "../services/todo.service";
import { NextFunction, Request, Response } from "express";
import { ITodo } from "../interfaces/todo.intereface";

export class ToDoController {
  public todoService = new TodoService();

  public getAllTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const findAllToDos: ITodo[] = await this.todoService.findAllTodo();

      res.status(200).json({ data: findAllToDos, message: "getAllTodo" });
    } catch (err) {
      next(err);
    }
  };

  public createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const todoData: ITodo = req.body;
      const createToDoData: ITodo = await this.todoService.createTodo(todoData);

      res.status(200).json({ data: createToDoData, message: "createTodo" });
    } catch (err) {
      next(err);
    }
  };

  public updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const todoData: ITodo = req.body;
      const updatedToDoData: ITodo = await this.todoService.updateTodo(
        todoData
      );

      res.status(200).json({ data: updatedToDoData, message: "updateTodo" });
    } catch (err) {
      next(err);
    }
  };

  public deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const todoId: number = Number(req.params.id);
      const deleteTodoData: ITodo = await this.todoService.deleteTodo(todoId);

      res.status(200).json({ data: deleteTodoData, message: "deleteTodo" });
    } catch (err) {
      next(err);
    }
  };
}
