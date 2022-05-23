import { Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { MongoClient } from 'mongodb';
import { MongoConnection } from './adaptors/mongo.connection';

// export const repositories: Provider[] = [
//   {
//     provide: 'COMPANY_REPOSITORY',
//     inject: ['DATABASE_CONNECTION'],
//     useFactory: (connection: MongoConnection) => new MongoCompanyRepository(connection, Company),
//   },
// ];

export const connection: Provider = {
  provide: 'DATABASE_CONNECTION',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<MongoConnection> => {
    try {
      const client = await MongoClient.connect(configService.get<string>('db.uri'));
      const principal = configService.get<string>('db.name');
      return new MongoConnection(principal, client);
    } catch (error) {
      throw error;
    }
  },
};

//CONECTOR PARA MULTI TENANTS EN CASO DE USAR ESTE, RECORDAR USAR LOS REPOSITORIOS Y LOS SERVICIOS QUE LOS USAN EN EL MISMO SCOPE REQUEST
export const tenantConnection: Provider = {
  provide: 'DATABASE_CONNECTION',
  inject: [ConfigService, REQUEST],
  scope: Scope.REQUEST,
  useFactory: async (configService: ConfigService, request: Request): Promise<MongoConnection> => {
    const tenant = <string>request.headers['domain'];
    const client = await MongoClient.connect(configService.get<string>('db.uri'));
    return new MongoConnection(tenant, client);
  },
};
