import { Request, Response } from 'express';
import { Color, Decorator, Logger } from '../domain/Logger';
export class NetTracer {
  private static method(request: Request): string {
    let methodString = request.method;
    switch (methodString) {
      case 'GET':
        methodString = Color.SUCCESS + methodString + Decorator.RESET;
        break;
      case 'POST':
        methodString = Color.WARNING + methodString + Decorator.RESET;
        break;
      case 'PUT':
        methodString = Color.IMPORTANT + methodString + Decorator.RESET;
        break;
      case 'DELETE':
        methodString = Color.ERROR + methodString + Decorator.RESET;
        break;
      default:
        break;
    }
    return methodString;
  }

  private static httpVersion(request: Request): string {
    const httpVersionString = request.httpVersion;
    return httpVersionString;
  }

  private static url(request: Request): string {
    let urlString = request.originalUrl;

    urlString = Color.INFO + urlString + Decorator.RESET;

    return urlString;
  }

  private static ip(request: Request): string {
    const ip = request.ip;
    const formattedIp = Color.SUCCESS + ip + Decorator.RESET;
    return formattedIp;
  }

  private static status(response: Response): string {
    let statusString = new String(response.statusCode || '-');

    switch (statusString[0]) {
      case '2':
        statusString = Color.SUCCESS + statusString + Decorator.RESET;
        break;

      case '3':
        statusString = Color.INFO + statusString + Decorator.RESET;
        break;

      case '4':
        statusString = Color.WARNING + statusString + Decorator.RESET;
        break;

      case '5':
        statusString = Color.ERROR + statusString + Decorator.RESET;
        break;
    }

    return statusString.toString();
  }

  private static responseTime(digits: number, request: any, response: any): string {
    digits = digits || 3;
    if (!response._startTime) response._startTime = process.hrtime();
    const elapsedTimeInMs = ((response._startTime[0] - request._startTime[0]) * 1e3 + (response._startTime[1] - request._startTime[1]) / 1e6).toFixed(
      digits,
    );
    return elapsedTimeInMs;
  }

  private static lengthResponse(response: any): string {
    const length = response.get('content-length') || '-';
    return length;
  }

  public static Request(request: Request, logger: Logger): void {
    const method = this.method(request);
    const httpVersion = this.httpVersion(request);
    const url = this.url(request);
    const ip = this.ip(request);
    const log = `Requested ${method} ${httpVersion} ${url} from ${ip}`;
    logger.request(log);
  }

  public static Response(request: Request, response: Response, logger: Logger): void {
    const time = this.responseTime(3, request, response);
    const url = this.url(request);
    const status = this.status(response);
    const length = this.lengthResponse(response);
    const ip = this.ip(request);
    const log = `Responded to ${url} requested by ${ip} with status ${status} (${length}) bytes in ${time} miliseconds`;
    logger.response(log);
  }
}
