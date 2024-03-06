import { ConfigService, ConfigKeys } from './config/config.service'
import { DataSource, DataSourceOptions } from 'typeorm'

const configService = new ConfigService()

export const typeormConfig: DataSourceOptions = {
    username: configService.get(ConfigKeys.POSTGRESQL_USERNAME),
    password: configService.get(ConfigKeys.POSTGRESQL_PASSWORD),
    port: +configService.get(ConfigKeys.POSTGRESQL_PORT),
    host: configService.get(ConfigKeys.POSTGRESQL_HOST),
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    database: configService.get(ConfigKeys.POSTGRESQL_DATABASE),
    type: 'postgres',
    entities: ['dist/**/*.entity.{js,ts}'],
    migrations: ['dist/migrations/*.{ts,js}'],
    migrationsRun: true,
    // logging: true,
}

export default new DataSource(typeormConfig)
