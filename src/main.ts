import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'
import { ConfigService, ConfigKeys } from '@config/config.service'
import { UsersEnvironment } from '@config/users.env'

async function bootstrap() {
    const configService = new ConfigService()
    const logger = new Logger(bootstrap.name)
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: UsersEnvironment.usersUrl,
            package: UsersEnvironment.packageUsers,
            protoPath: UsersEnvironment.protoPathUsers,
        },
    })

    await app.listen()
    logger.debug(`Server start in port: ${configService.get(ConfigKeys.SERVICE_PORT)}`)
}

bootstrap()
