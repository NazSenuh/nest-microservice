import { ValidationFailedExeption } from '@common/exeptions'
import { ValidationError } from '@common/types'
import { Metadata } from '@grpc/grpc-js'
import { ServerUnaryCallImpl } from '@grpc/grpc-js/build/src/server-call'
import { Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidateDtoPipe<T extends object> implements PipeTransform {
    constructor(private type: new () => T) {}

    public async transform(value: Record<string, unknown>) {
        if (value instanceof ServerUnaryCallImpl || value instanceof Metadata) {
            return value
        }

        const object = plainToInstance(this.type, value)
        const errors = await validate(object)

        if (errors.length > 0) {
            throw new ValidationFailedExeption(errors[0].property as ValidationError)
        }

        return value
    }
}
