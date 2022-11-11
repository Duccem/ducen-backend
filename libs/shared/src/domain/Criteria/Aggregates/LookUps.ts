import { LookUp } from './LookUp';

export class LookUps {
  readonly lookUps: LookUp[];
  constructor(lookUps: LookUp[]) {
    this.lookUps = lookUps;
  }

  static fromValues(filters: Array<Map<string, string>>): LookUps {
    return new LookUps(filters.map(LookUp.fromValues));
  }
}
