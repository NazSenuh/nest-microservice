import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { CacheModule } from '@nestjs/cache-manager'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        CacheModule.register({
            ttl: 60,
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
