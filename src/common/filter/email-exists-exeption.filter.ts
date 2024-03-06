import { EmailExistsExeption } from '@common/exeptions'
import { Catch, Logger, RpcExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Observable, throwError } from 'rxjs'

@Catch(EmailExistsExeption)
export class EmailExistsExeptionFilter implements RpcExceptionFilter<RpcException> {
    private logger = new Logger(EmailExistsExeptionFilter.name)

    public catch(exception: RpcException): Observable<any> {
        this.logger.error(exception.getError())
        return throwError(() => ({
            message: exception.getError(),
        }))
    }
}
