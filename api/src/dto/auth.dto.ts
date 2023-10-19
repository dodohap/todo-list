import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class AuthSignUpDto {
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
  password: string;
}

export class AuthLogInDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @MinLength(3)
  @MaxLength(16)
  userName: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;
}

export class AuthLogOutDto {
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
