import { Criteria } from '../Criteria';

export class OrCriteria extends Criteria {
  constructor(private left: Criteria, private right: Criteria) {
    super();
  }
  public isSatisfiedBy(): object {
    return { $or: [this.left.isSatisfiedBy(), this.right.isSatisfiedBy()] };
  }
}
