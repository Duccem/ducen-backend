import { DynamicModule, Global, Module } from '@nestjs/common';
import { connection } from './database.provider';
@Global()
@Module({})
export class DatabaseModule {
  static register(options): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [connection, ...options.repositories],
      exports: ['DATABASE_CONNECTION', ...options.repositories_names],
    };
  }
}
