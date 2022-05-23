import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from '../services/company.service';

@Controller('company')
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
}
