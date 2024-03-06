import { RpcException } from '@nestjs/microservices'

export class NotFoundUserExeption extends RpcException {
    public constructor() {
        super('No user found')
    }
}
