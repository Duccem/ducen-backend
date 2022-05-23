import { AndCriteria } from './criteria/AndCriteria';
import { NotCriteria } from './criteria/NotCriteria';
import { OrCriteria } from './criteria/OrCriteria';

export abstract class Criteria {
  public abstract isSatisfiedBy(): object;
  public and(other: Criteria): Criteria {
    return new AndCriteria(this, other);
  }
  public or(other: Criteria): Criteria {
    return new OrCriteria(this, other);
  }
  public not(): Criteria {
    return new NotCriteria(this);
  }
}
