import { ValidationError } from '@common/types'
import { IsEmail, IsOptional, IsString, IsUUID, Length, MinLength } from 'class-validator'

export class UpdateUserDto {
    @IsUUID('all', { context: ValidationError.ID })
    @IsString({ context: ValidationError.ID })
    public readonly id: string

    @IsOptional({ context: ValidationError.USERNAME })
    @MinLength(3, { context: ValidationError.USERNAME })
    @IsString({ context: ValidationError.USERNAME })
    public readonly username?: string

    @IsOptional({ context: ValidationError.EMAIL })
    @IsEmail(undefined, { context: ValidationError.EMAIL })
    @IsString({ context: ValidationError.EMAIL })
    public readonly email?: string

    @IsOptional({ context: ValidationError.PASSWORD })
    @Length(6, 20, { context: ValidationError.PASSWORD })
    @IsString({ context: ValidationError.PASSWORD })
    public readonly password?: string
}
