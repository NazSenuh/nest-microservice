import { RpcException } from '@nestjs/microservices'

export class EmailExistsExeption extends RpcException {
    public constructor() {
        super('This email is exists')
    }
}
