import { Module } from '@nestjs/common';
import { CompanyController } from './infraestructure/company.controller';
import { CompanyService } from './services/CompanyService';

@Module({
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
