import { ErrorTypes, GeneralError } from '@ducen/adaptors/http/domain/Error';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new GeneralError(ErrorTypes.UNAUTHORIZED);
    }
    return user;
  }
}
