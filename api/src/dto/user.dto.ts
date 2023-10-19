import { IsString, IsDefined, IsNotEmpty, MaxLength, MinLength, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @MinLength(3)
    @MaxLength(16)
    userName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @MaxLength(32)
    password: string
}

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    @MaxLength(32)
    password: string
}