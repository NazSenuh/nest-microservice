import { Injectable } from '@nestjs/common'
import { config } from 'dotenv'

config()

export enum ConfigKeys {
    POSTGRESQL_USERNAME = 'postgresqlUsername',
    POSTGRESQL_PASSWORD = 'postgresqlPassword',
    POSTGRESQL_PORT = 'postgresqlPort',
    POSTGRESQL_HOST = 'postgresqlHost',
    POSTGRESQL_DATABASE = 'postgresqlDatabase',
    SERVICE_PORT = 'servervicePort',
    SERVICE_HOST = 'serverviceHost',
    SERVICE_URL = 'serverviceUrl',
}

interface IConfig {
    postgresqlUsername: string
    postgresqlPassword: string
    postgresqlPort: string
    postgresqlHost: string
    postgresqlDatabase: string
    servervicePort: string
    serverviceHost: string
    serverviceUrl: string
}

@Injectable()
export class ConfigService {
    private config = {} as IConfig

    public constructor() {
        this.config.postgresqlUsername = process.env.POSTGRESQL_USERNAME
        this.config.postgresqlPassword = process.env.POSTGRESQL_PASSWORD
        this.config.postgresqlPort = process.env.POSTGRESQL_PORT
        this.config.postgresqlHost = process.env.POSTGRESQL_HOST
        this.config.postgresqlDatabase = process.env.POSTGRESQL_DATABASE
        this.config.servervicePort = process.env.SERVICE_PORT
        this.config.serverviceHost = process.env.SERVICE_HOST
        this.config.serverviceUrl = `${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}`
    }

    public get(key: keyof IConfig) {
        return this.config[key]
    }
}
