import { Criteria } from '../Criteria';

export class NotCriteria extends Criteria {
  constructor(private spec: Criteria) {
    super();
  }
  public isSatisfiedBy(): object {
    return { $not: [this.spec.isSatisfiedBy()] };
  }
}
