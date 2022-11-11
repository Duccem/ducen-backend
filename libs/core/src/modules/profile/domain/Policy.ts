import { CompoundValueObject, Primitives } from '@ducen/shared';

export interface Policies {
  entity: string;
  actions: string[];
}

export class Policy extends CompoundValueObject<Policies> {
  constructor(data: Primitives<Policies>) {
    super({
      actions: data.actions as string[],
      entity: data.entity,
    });
  }

  public getValue(): Policies {
    return {
      actions: this.value.actions,
      entity: this.value.entity,
    };
  }
}
