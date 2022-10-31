import { AnyAbility, defineAbility } from '@casl/ability';
import { AbilityMaker } from '../domain/AbilityMaker';
import { Profile } from '../domain/Profile';

export class CaslAbilityMaker implements AbilityMaker {
  build(profile: Profile) {
    const ability: AnyAbility = defineAbility<AnyAbility>((can) => {
      profile.policies.forEach((policy) => {
        const pol = policy.getValue();
        pol.actions.forEach((action) => {
          can(action, pol.entity);
        });
      });
    });
    return ability;
  }
  check(ability: AnyAbility, action: string, entity: string): boolean {
    return ability.can(action, entity);
  }
}
