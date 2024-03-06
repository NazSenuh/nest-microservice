import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ConfigModule } from './config/config.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeormConfig } from './typeorm.config'

@Module({
    imports: [
        UsersModule,
        ConfigModule,
        TypeOrmModule.forRootAsync({
            useFactory: () => typeormConfig,
        }),
    ],
})
export class AppModule {}
