import { IsOptional, IsString } from 'class-validator'

export class GetUsersDto {
    @IsOptional()
    @IsString()
    public readonly userData?: string
}
