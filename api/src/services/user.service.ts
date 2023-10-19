import { hash } from "bcrypt";
import { databaseTodoTabel, databaseUsersTabel } from "../database/db";
import { IUser } from "../interfaces/user.interface";
import { HttpException } from "../exeptions/http.exception";
import { ITodo } from "../interfaces/todo.intereface";
import { CreateUserDto } from "../dto/user.dto";

export class UserService {
  public getAllUsers = async (): Promise<IUser[]> =>
    await databaseUsersTabel().select();

  public async findUserById(userId: number): Promise<IUser> {
    const findUser: IUser = await databaseUsersTabel()
      .where("id", "=", userId)
      .first();

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
    const findUserByName: IUser = await databaseUsersTabel()
      .where("userName", "=", userData.userName)
      .first();

    if (findUserByName)
      throw new HttpException(409, "User with this userName already exist!");

    const findUserByEmail: IUser = await databaseUsersTabel()
      .where("userName", "=", userData.email)
      .first();

    if (findUserByEmail)
      throw new HttpException(409, "User with this email already exist!");

    const hashedPassword = await hash(userData.password, 10);
    const createdUserData: IUser = await databaseUsersTabel().insert({
      ...userData,
      password: hashedPassword,
    });

    return createdUserData;
  }

  public async updateUser(userId: number, userData: IUser): Promise<IUser> {
    await this.findUserById(userId); //if not found, throw error

    const newHashedPassword = await hash(userData.password, 10);
    await databaseUsersTabel()
      .update({ ...userData, password: newHashedPassword })
      .where("id", "=", userId);

    const newUser: IUser = await databaseUsersTabel()
      .where("id", "=", userId)
      .first();
    return newUser;
  }

  public async deleteUser(userId: number): Promise<IUser> {
    const findUser: IUser = await this.findUserById(userId); //if not found, throw error

    await databaseUsersTabel().delete().where("id", "=", userId);
    return findUser;
  }

  public getUserTodoList = async (userId: number): Promise<ITodo[]> =>
    await databaseTodoTabel().where("userId", "=", userId);
}
