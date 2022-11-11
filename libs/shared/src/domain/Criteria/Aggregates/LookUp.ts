import { LookUpEntity } from './LookUpEntity';
import { LookUpRelationship } from './LookUpRelationship';

export class LookUp {
  readonly entity: LookUpEntity;
  readonly relationship: LookUpRelationship;

  constructor(entity: LookUpEntity, relationship: LookUpRelationship) {
    this.entity = entity;
    this.relationship = relationship;
  }

  static fromValues(values: Map<string, string>): LookUp {
    const value = values.get('entity');
    const relationship = values.get('relationship');
    if (!value || !relationship) {
      throw new Error(`The lookup is invalid`);
    }

    return new LookUp(new LookUpEntity(value), LookUpRelationship.fromValue(relationship));
  }
}
