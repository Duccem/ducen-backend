import { Aggregate, EnumValueObject, JsonDocument } from '@ducen/shared';
import { ErrorTypes, GeneralError } from './Error';

export enum ResponseTypes {
  SUCCESS = 'SUCCESS',
  FOUNDED = 'FOUNDED',
  LISTED = 'LISTED',
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

type ResponseData = {
  code: number;
  message: string;
};

type Paginate = {
  page: number;
  size: number;
  total: number;
  pages: number;
};

type Payload = {
  data: JsonDocument<Aggregate> | Array<JsonDocument<Aggregate>>;
  offset?: number;
  limit?: number;
  total?: number;
};

export class GeneralResponse extends EnumValueObject<ResponseTypes> {
  private readonly code: number;
  private readonly message: string;
  private readonly payload: Payload;
  private readonly RESPONSE_DATA = new Map<ResponseTypes, ResponseData>([
    [ResponseTypes.CREATED, { code: 201, message: 'Inserted' }],
    [ResponseTypes.DELETED, { code: 201, message: 'Deleted' }],
    [ResponseTypes.UPDATED, { code: 201, message: 'Updated' }],
    [ResponseTypes.FOUNDED, { code: 200, message: 'Element founded' }],
    [ResponseTypes.LISTED, { code: 201, message: 'Elements founded listed' }],
    [ResponseTypes.SUCCESS, { code: 201, message: 'Success' }],
  ]);

  constructor(value: ResponseTypes, payload: Payload, code?: number, message?: string) {
    super(value, Object.values(ResponseTypes));
    this.payload = payload;
    this.code = code;
    this.message = message;
  }

  public getCode(): number {
    return this.code || this.RESPONSE_DATA.get(this.value).code;
  }

  public getMessage(): string {
    return this.message || this.RESPONSE_DATA.get(this.value).message;
  }

  public getPayload(): JsonDocument<Aggregate> | Array<JsonDocument<Aggregate>> {
    return this.payload.data;
  }

  public getPaginate(): Paginate {
    let pages: number;
    if (this.payload.limit > this.payload.total) pages = 1;
    else {
      const module = Math.round(this.payload.total / this.payload.limit);
      if (this.payload.total % module === 0) pages = module;
      else pages = module + 1;
    }
    return {
      page: this.payload.offset,
      pages: pages,
      size: this.payload.limit,
      total: this.payload.total,
    };
  }

  protected throwErrorForInvalidValue(value: ResponseTypes): void {
    throw new GeneralError(ErrorTypes.INTERNAL, `The response type ${value} is invalid`);
  }
}
