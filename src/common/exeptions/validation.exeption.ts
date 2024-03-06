import { ValidationError } from '@common/types'
import { RpcException } from '@nestjs/microservices'

export class ValidationFailedExeption extends RpcException {
    public constructor(cause: ValidationError) {
        super(cause)
    }
}
