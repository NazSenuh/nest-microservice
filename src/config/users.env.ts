import { ConfigService, ConfigKeys } from './config.service'

const config = new ConfigService()

export const UsersEnvironment = {
    usersUrl: config.get(ConfigKeys.SERVICE_URL),
    packageUsers: 'users',
    protoPathUsers: 'dist/users/proto/users.proto',
} as const
