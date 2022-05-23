import { Criteria } from '@ducen/shared';

export class SearchSocialReasonCriteria extends Criteria {
  constructor(private term: string) {
    super();
  }
  public isSatisfiedBy(): object {
    return { $regexMatch: { input: '$principalData.socialReason', regex: new RegExp(`/${this.term}/`) } };
  }
}
