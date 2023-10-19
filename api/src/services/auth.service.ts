import { IUser } from "../interfaces/user.interface";
import { databaseUsersTabel } from "../database/db";
import { HttpException } from "../exeptions/http.exception";
import { compare, hash } from "bcrypt";
import crypto from "crypto";
import { getFormattedDate } from "../utils/dateUtil";

export class AuthService {
  public async signUp(userData: IUser): Promise<IUser> {
    const findUser: IUser = await databaseUsersTabel()
      .where("userName", "=", userData.userName)
      .first();

    if (findUser)
      throw new HttpException(409, "Ta nazwa uzytkownika jest zajeta!");

    const hashedPassword = await hash(userData.password, 10);
    const createdUserData: IUser = await databaseUsersTabel().insert({
      ...userData,
      createdAt: getFormattedDate(),
      password: hashedPassword,
    });

    return createdUserData;
  }

  public async logIn(userData: IUser): Promise<{ findUser: IUser }> {
    const findUser: IUser = await databaseUsersTabel()
      .where("userName", "=", userData.userName)
      .first();

    if (!findUser)
      throw new HttpException(
        409,
        "Nazwa uzytkownika lub haslo jest nieprawidlowe!"
      );

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );

    if (!isPasswordMatching)
      throw new HttpException(
        409,
        "Nazwa uzytkownika lub haslo jest nieprawidlowe!"
      );

    let randomUUID = crypto.randomUUID();

    findUser.sessionId = randomUUID;
    findUser.lastLogin = getFormattedDate();

    await databaseUsersTabel()
      .update({ lastLogin: getFormattedDate(), ...findUser })
      .where("userName", "=", userData.userName);

    return { findUser };
  }

  public async logOut(userId: number): Promise<IUser> {
    const findUser: IUser = await databaseUsersTabel()
      .where("id", "=", userId)
      .first();

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await databaseUsersTabel()
      .update({ sessionId: "", ...findUser })
      .where("id", "=", findUser.id);

    return findUser;
  }
}
