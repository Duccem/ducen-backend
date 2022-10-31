import { ErrorTypes, GeneralError } from '@ducen/adaptors';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AbilityMaker } from '../domain/AbilityMaker';
import { Profile } from '../domain/Profile';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject('ABILITY_MAKER') private abilityMaker: AbilityMaker) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const action = this.reflector.get<string>('action', context.getHandler());
    const entity = this.reflector.get<string>('entity', context.getClass());
    if (!entity) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const profile = new Profile(user.profile);
    const ability = this.abilityMaker.build(profile);
    const allowed = this.abilityMaker.check(ability, action, entity);

    if (allowed) return true;
    throw new GeneralError(ErrorTypes.FORBIDDEN, 'Route forbidden');
  }
}
