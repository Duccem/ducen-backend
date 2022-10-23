import { CatchErrors, ResponseModeler } from '@ducen/adaptors';
import { CompanyService, RegisterCompanyDTO } from '@ducen/core';
import { Body, Controller, Get, Param, Post, UseFilters, UseInterceptors } from '@nestjs/common';

@Controller('company')
@UseFilters(CatchErrors)
@UseInterceptors(ResponseModeler)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  async create(@Body() data: any) {
    return await this.companyService.insert(data);
  }

  @Get()
  async get() {
    return await this.companyService.get();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.companyService.getOne(id);
  }

  @Post('register')
  async register(@Body() data: RegisterCompanyDTO) {
    return await this.companyService.register(data);
  }
}
