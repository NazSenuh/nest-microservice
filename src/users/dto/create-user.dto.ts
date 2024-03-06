import { ValidationError } from '@common/types'
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty({ context: ValidationError.USERNAME })
    @MinLength(3, { context: ValidationError.USERNAME })
    @IsString({ context: ValidationError.USERNAME })
    public readonly username: string

    @IsNotEmpty({ context: ValidationError.EMAIL })
    @IsEmail(undefined, { context: ValidationError.EMAIL })
    @IsString({ context: ValidationError.EMAIL })
    public readonly email: string

    @IsNotEmpty({ context: ValidationError.PASSWORD })
    @Length(6, 20, { context: ValidationError.PASSWORD })
    @IsString({ context: ValidationError.PASSWORD })
    public readonly password: string
}
