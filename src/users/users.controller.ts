import { ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { UsersService } from './users.service'
import { FilterUndefinedInterceptor } from '@common/interceptors'
import { ValidateDtoPipe } from '@common/pipe'
import { EmailExistsExeptionFilter, ValidationExeptionFilter, NotFoundUserExeptionFilter } from '@common/filter'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { CompareUserDto, CreateUserDto, GetUsersDto, UpdateUserDto, UserFindOneDto, UserIdDto } from './dto'

@Controller()
@UseFilters(new ValidationExeptionFilter())
export class UsersController {
    public constructor(private readonly usersService: UsersService) {}

    @GrpcMethod('UsersService', 'CreateUser')
    @UsePipes(new ValidateDtoPipe(CreateUserDto))
    @UseFilters(new EmailExistsExeptionFilter())
    public async createUser(createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @GrpcMethod('UsersService', 'GetUsers')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidateDtoPipe(GetUsersDto))
    public async findUsers({ userData }: GetUsersDto) {
        return this.usersService.findUsers(userData)
    }

    @GrpcMethod('UsersService', 'GetOneUser')
    @UseInterceptors(CacheInterceptor, ClassSerializerInterceptor)
    @UsePipes(new ValidateDtoPipe(UserFindOneDto))
    @UseFilters(new NotFoundUserExeptionFilter())
    public async findOneUser(params: UserFindOneDto) {
        return this.usersService.findOneUser(params)
    }

    @GrpcMethod('UsersService', 'UpdateUser')
    @UseInterceptors(FilterUndefinedInterceptor)
    @UsePipes(new ValidateDtoPipe(UpdateUserDto))
    @UseFilters(new EmailExistsExeptionFilter())
    public async updateUser(updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(updateUserDto.id, updateUserDto)
    }

    @GrpcMethod('UsersService', 'DeleteUser')
    @UsePipes(new ValidateDtoPipe(UserIdDto))
    public async removeUser({ id }: UserIdDto) {
        return this.usersService.removeUser(id)
    }

    @GrpcMethod('UsersService', 'CompareUser')
    @UsePipes(new ValidateDtoPipe(CompareUserDto))
    public async compareUser({ password, email }: CompareUserDto) {
        return this.usersService.comparePassword(password, email)
    }
}
