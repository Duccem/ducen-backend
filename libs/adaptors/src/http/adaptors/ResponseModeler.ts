import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { GeneralResponse } from '../domain/Response';

export class ResponseModeler implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response>();
    return next.handle().pipe(
      map((data: GeneralResponse) => {
        let response: any = {
          code: data.getCode(),
          message: data.getMessage(),
          data: data.getPayload(),
        };

        if (Array.isArray(response.data)) {
          response = {
            ...response,
            paginate: data.getPaginate(),
          };
        }
        res.status(data.getCode());
        return response;
      }),
    );
  }
}
