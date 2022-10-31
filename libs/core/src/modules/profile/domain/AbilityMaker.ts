import { Profile } from './Profile';

export interface AbilityMaker {
  build(profile: Profile): any;
  check(ability: any, action: string, entity: string): boolean;
}
