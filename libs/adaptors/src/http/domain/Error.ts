import { EnumValueObject } from '@ducen/shared';

export enum ErrorTypes {
  INTERNAL = 'INTERNAL',
  BAD_REQUEST = 'BAD_REQUEST',
  FORBIDDEN = 'FORBIDDEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_ARGUMENT = 'INVALID_ARGUMENT',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
}

type ErrorData = {
  code: number;
  message: string;
};

export class GeneralError extends EnumValueObject<ErrorTypes> {
  private readonly message: string;
  private readonly code: number;
  private readonly ERROR_DATA = new Map<ErrorTypes, ErrorData>([
    [ErrorTypes.BAD_REQUEST, { code: 400, message: 'Bad Request' }],
    [ErrorTypes.FORBIDDEN, { code: 403, message: 'Your not allowed to use this resource' }],
    [ErrorTypes.INTERNAL, { code: 500, message: 'Internal Server Error' }],
    [ErrorTypes.INVALID_ARGUMENT, { code: 400, message: 'Argument with bad format or doesn`t exists' }],
    [ErrorTypes.NOT_FOUND, { code: 404, message: 'Not Found' }],
    [ErrorTypes.RESOURCE_NOT_FOUND, { code: 404, message: 'The resource you`re looking for doesn`t exist' }],
    [ErrorTypes.UNAUTHORIZED, { code: 401, message: 'Invalid credentials' }],
  ]);
  constructor(value: ErrorTypes, message?: string, code?: number) {
    super(value, Object.values(ErrorTypes));
    this.message = message;
    this.code = code;
  }

  public getCode(): number {
    return this.code || this.ERROR_DATA.get(this.value).code;
  }

  public getMessage(): string {
    return this.message || this.ERROR_DATA.get(this.value).message;
  }

  protected throwErrorForInvalidValue(value: ErrorTypes): void {
    throw new GeneralError(ErrorTypes.INTERNAL, `The error type ${value} is invalid`);
  }
}
