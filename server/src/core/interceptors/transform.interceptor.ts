import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus, HttpCode } from '@nestjs/common';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IResponse<T> {
  data: T
  status: HttpStatus
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse()
    const req = context.switchToHttp().getRequest()
    return next
      .handle()
      .pipe(
        map((data) => ({
          data: data ?? null,
          statusCode: data?.statusCode ?? 200,
        }))
      )
  }
}
