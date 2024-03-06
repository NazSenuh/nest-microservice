import { ValidationError } from '@common/types'
import { IsEmail, IsOptional, IsString, Length } from 'class-validator'

export class CompareUserDto {
    @IsOptional({ context: ValidationError.EMAIL })
    @IsEmail(undefined, { context: ValidationError.EMAIL })
    @IsString({ context: ValidationError.EMAIL })
    public readonly email: string

    @IsOptional({ context: ValidationError.PASSWORD })
    @Length(6, 20, { context: ValidationError.PASSWORD })
    @IsString({ context: ValidationError.PASSWORD })
    public readonly password: string
}
