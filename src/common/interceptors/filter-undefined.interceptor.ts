import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class FilterUndefinedInterceptor implements NestInterceptor {
    public intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(map((data) => this.filterUndefinedFields(data)))
    }

    private filterUndefinedFields(data: unknown): unknown {
        if (data && typeof data === 'object') {
            const filteredData = Object.entries(data)
                .filter(([, value]) => value !== undefined && value !== null)
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})

            return filteredData
        }
        return data
    }
}
