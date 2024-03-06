import { Injectable, Logger } from '@nestjs/common'
import { UserEntity } from './entities/user.entity'
import { Like, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from '@common/types'
import * as bcrypt from 'bcryptjs'
import { EmailExistsExeption, NotFoundUserExeption } from '@common/exeptions'
import { CreateUserDto, UpdateUserDto, UserFindOneDto } from './dto'

@Injectable()
export class UsersService {
    public constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    private readonly logger = new Logger(UsersService.name)

    public async createUser(createUserDto: CreateUserDto) {
        const isExists = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        })
        if (isExists) {
            throw new EmailExistsExeption()
        }

        const hashPassword = await bcrypt.hash(createUserDto.password, await bcrypt.genSalt(7))

        const user = this.userRepository.create({
            ...createUserDto,
            password: hashPassword,
            role: Role.USER,
        })

        await this.userRepository.save(user)
        this.logger.debug('User successfully created')

        return { status: 'success' }
    }

    public async findUsers(userData: string) {
        const users = await this.userRepository.find({
            where: [
                {
                    username: Like(`%${userData ? userData : ''}%`),
                },
                {
                    email: Like(`%${userData ? userData : ''}%`),
                },
            ],
        })

        return { users }
    }

    public async findOneUser({ id, email }: UserFindOneDto) {
        const user = await (email
            ? this.userRepository.findOne({ where: { email } })
            : this.userRepository.findOne({ where: { id } }))
        console.log(user)
        if (user) {
            return user
        } else {
            throw new NotFoundUserExeption()
        }
    }

    public async updateUser(id: string, updateUserDto: UpdateUserDto) {
        if (updateUserDto.email) {
            const isExists = await this.userRepository.findOne({
                where: { email: updateUserDto.email },
            })
            if (isExists && isExists.id !== id) {
                throw new EmailExistsExeption()
            }
        }

        if (updateUserDto.password) {
            const hashPassword = await bcrypt.hash(updateUserDto.password, await bcrypt.genSalt(7))
            await this.userRepository.update(id, { ...updateUserDto, password: hashPassword })
        } else {
            await this.userRepository.update(id, updateUserDto)
        }

        this.logger.debug('User successfully updated')
        return { status: 'success' }
    }

    public async removeUser(id: string) {
        await this.userRepository.delete(id)
        this.logger.debug('User successfully deleted')
        return { status: 'success' }
    }

    public async comparePassword(password: string, email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        const result = await bcrypt.compare(password, user.password)
        return { result }
    }
}
