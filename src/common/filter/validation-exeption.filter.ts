import { ValidationFailedExeption } from '@common/exeptions'
import { ValidationError } from '@common/types'
import { Catch, Logger, RpcExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Observable, throwError } from 'rxjs'

@Catch(ValidationFailedExeption)
export class ValidationExeptionFilter implements RpcExceptionFilter<RpcException> {
    private logger = new Logger(ValidationExeptionFilter.name)

    public catch(exception: RpcException): Observable<any> {
        const errorType = exception.getError()
        if (typeof errorType === 'string') {
            const message = this.generateMessage(errorType)
            this.logger.error(message)
            return throwError(() => ({ message }))
        }
        this.logger.error('Server error')
        return throwError(() => ({ message: 'Server error' }))
    }

    private generateMessage(key: string) {
        const messages = {
            [ValidationError.ID]: 'Invalid id',
            [ValidationError.EMAIL]: 'Invalid email',
            [ValidationError.PASSWORD]: 'Invalid password',
            [ValidationError.USERNAME]: 'Invalid username',
        }

        return messages[key]
    }
}
