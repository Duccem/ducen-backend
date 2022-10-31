import { SetMetadata } from '@nestjs/common';

export const SetAction = (action: string) => SetMetadata('action', action);
export const SetEntity = (entity: string) => SetMetadata('entity', entity);
