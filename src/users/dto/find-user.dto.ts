import { ValidationError } from '@common/types'
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator'

export class UserFindOneDto {
    @IsUUID('all', { context: ValidationError.ID })
    @IsOptional({ context: ValidationError.ID })
    @IsString({ context: ValidationError.ID })
    public readonly id?: string

    @IsEmail(undefined, { context: ValidationError.EMAIL })
    @IsOptional({ context: ValidationError.EMAIL })
    @IsString({ context: ValidationError.EMAIL })
    public readonly email?: string
}
