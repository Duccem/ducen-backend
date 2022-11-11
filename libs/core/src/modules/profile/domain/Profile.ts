import { Aggregate, Primitives } from '@ducen/shared';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { Policy } from './Policy';
import { Role, Roles } from './Role';

export class Profile extends Aggregate {
  public name: string;
  public description: string;

  @Exclude() public role: Role;
  @Exclude() public policies: Policy[];

  constructor(data: Primitives<Profile>) {
    super(data);
    this.role = new Role(data.role as Roles);
    this.policies = data.policies.map((policy) => new Policy(policy));
    this.name = data.name;
    this.description = data.description;
  }

  @Expose({ name: 'role' })
  public get rol(): string {
    return this.role.value;
  }

  @Expose({ name: 'policies' })
  public get pol(): { actions: string[]; entity: string }[] {
    return this.policies.map((policy) => {
      const pol = policy.getValue();
      return {
        actions: pol.actions,
        entity: pol.entity,
      };
    });
  }

  public toPrimitives<Profile>(context?: string): Primitives<Profile> {
    return <Primitives<Profile>>instanceToPlain(this, { groups: [context] });
  }
}
