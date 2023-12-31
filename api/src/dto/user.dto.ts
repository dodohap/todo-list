import {
  IsString,
  IsDefined,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEmail,
  IsNumber,
} from "class-validator";

export class CreateUserDto {
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
  @MaxLength(32)
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @MaxLength(32)
  password: string;
}

export class UserTodoListDto {
  @IsNotEmpty()
  @IsNumber()
  @IsDefined()
  id: number;
}
