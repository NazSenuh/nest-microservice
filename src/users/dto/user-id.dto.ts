import { ValidationError } from '@common/types'
import { IsString, IsUUID } from 'class-validator'

export class UserIdDto {
    @IsUUID('all', { context: ValidationError.ID })
    @IsString({ context: ValidationError.ID })
    public readonly id: string
}
