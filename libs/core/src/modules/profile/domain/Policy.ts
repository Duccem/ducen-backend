import { CompoundValueObject } from '@ducen/shared';
import { Actions } from './Action';
import { Entities } from './Entity';

export interface Policies {
  entity: Entities;
  actions: Actions[];
}

export class Policy extends CompoundValueObject<Policies> {
  constructor(entity: Entities, actions: Actions[]) {
    super({
      actions: actions,
      entity: entity,
    });
  }

  public getValue(): Policies {
    return {
      actions: this.value.actions,
      entity: this.value.entity,
    };
  }
}
