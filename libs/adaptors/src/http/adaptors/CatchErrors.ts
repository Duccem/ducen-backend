import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { GeneralError } from '../domain/Error';

@Catch(GeneralError)
export class CatchErrors implements ExceptionFilter {
  catch(exception: GeneralError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(exception.getCode()).json({
      message: exception.getMessage(),
      code: exception.getCode(),
      timestamp: new Date().toISOString(),
    });
  }
}
