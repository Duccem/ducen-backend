import { Criteria } from '../Criteria';

export class AndCriteria extends Criteria {
  constructor(private left: Criteria, private right: Criteria) {
    super();
  }
  public isSatisfiedBy(): object {
    return { $and: [this.left.isSatisfiedBy(), this.right.isSatisfiedBy()] };
  }
}
