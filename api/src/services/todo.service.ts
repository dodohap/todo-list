import { ITodo } from "../interfaces/todo.intereface";
import { databaseTodoTabel } from "../database/db";
import { HttpException } from "../exeptions/http.exception";
import { getFormattedDate } from "../utils/dateUtil";

export class TodoService {
  public async findAllTodo(): Promise<ITodo[]> {
    const todo: ITodo[] = await databaseTodoTabel().select();

    return todo;
  }

  public async createTodo(todoData: ITodo): Promise<ITodo> {
    let newTodo: ITodo = {
      createdAt: getFormattedDate(),
      ...todoData,
    };

    const id = await databaseTodoTabel().insert(newTodo);

    const createdTodoData: ITodo = await databaseTodoTabel()
      .where("id", "=", id[0])
      .first();

    return createdTodoData;
  }

  public async updateTodo(todoData: ITodo): Promise<ITodo> {
    const todo: ITodo = await databaseTodoTabel()
      .where("id", "=", todoData.id)
      .first();

    if (!todo) throw new HttpException(409, "Cannot find todo!");

    await databaseTodoTabel()
      .update({ createdAt: getFormattedDate(), ...todoData })
      .where("id", "=", todoData.id);

    const updatedTodoData: ITodo = await databaseTodoTabel()
      .where("id", "=", todoData.id)
      .first();

    return updatedTodoData;
  }

  public async deleteTodo(todoId: number): Promise<ITodo> {
    const todo = await databaseTodoTabel().where("id", "=", todoId).first();
    if (!todo) throw new HttpException(409, "Cannot find todo!");

    await databaseTodoTabel().delete().where("id", "=", todoId);

    return todo;
  }

  public getUserTodoList = async (userId: number): Promise<ITodo[]> => {
    return await databaseTodoTabel().where("userId", "=", Number(userId));
  };
}
