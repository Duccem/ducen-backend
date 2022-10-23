import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { createWriteStream } from 'fs-extra';
import { join } from 'path';
import { Color, Decorator, FormatDates, Logger, LogTypes } from '../domain/Logger';

@Injectable()
export class NestLogger implements Logger {
  private readonly writeInFile: boolean;
  constructor(writeInFile = false) {
    this.writeInFile = writeInFile;
  }

  log(message: any): void {
    this.print(message, Color.SUCCESS, LogTypes.LOG);
  }
  error(message: any): void {
    this.print(message, Color.ERROR, LogTypes.ERROR);
  }
  warn(message: any): void {
    this.print(message, Color.WARNING, LogTypes.WARNING);
  }
  debug(message: any): void {
    this.print(message, Color.INFO, LogTypes.INFO);
  }
  verbose(message: any): void {
    this.print(message, Color.INFO, LogTypes.INFO);
  }

  request(message: any): void {
    this.print(message, Color.IMPORTANT, LogTypes.REQUEST);
  }

  response(message: any): void {
    this.print(message, Color.SUCCESS, LogTypes.RESPONSE);
  }

  private writeLog(message: string): void {
    const dateFile = format(new Date(), 'yyyy-MM-dd');
    const file = createWriteStream(join(process.cwd(), `logs/${dateFile}.log`), { flags: 'a' });
    file.write(message + '\n');
  }

  private color(message: any, color: Color): string {
    return color + message + Decorator.RESET;
  }

  private date(): string {
    const current = new Date();
    return format(current, FormatDates.ISO);
  }

  private print(message: any, color: Color, type: LogTypes) {
    const tailMessage = `${type} ${this.date()}`;
    const logMessage = `${this.color(tailMessage, color)} ${message}`;
    console.log(logMessage);
    if (this.writeInFile) this.writeLog(this.sanitize(logMessage));
  }

  private sanitize(message: string): string {
    for (const color of Object.values(Color)) {
      message = message.split(color).join('');
    }

    for (const decorator of Object.values(Decorator)) {
      message = message.split(decorator).join('');
    }
    return message;
  }
}
