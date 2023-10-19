import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTodoDto {
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    userId: number

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    description: string

    @IsNotEmpty()
    @IsString()
    status: string
}

export class TodoDto {
    @IsNumber()
    id: number

    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    userId: Number

    @IsNotEmpty()
    @IsString()
    @IsDefined()
    description: string
}