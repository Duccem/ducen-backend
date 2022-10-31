import { CatchErrors, ResponseModeler } from '@ducen/adaptors';
import { Actions, Entities, ProfileGuard, ProfileService, SetAction, SetEntity } from '@ducen/core';
import { Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
@SetEntity(Entities.PROFILE)
@UseFilters(CatchErrors)
@UseInterceptors(ResponseModeler)
@UseGuards(AuthGuard('jwt'), ProfileGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @SetAction(Actions.READ)
  async list() {
    return await this.profileService.getProfiles();
  }

  @Get(':id')
  @SetAction(Actions.READ)
  async get(@Param('id') id: string) {
    return await this.profileService.getProfile(id);
  }

  @Post()
  @SetAction(Actions.CREATE)
  async create(@Body() data: any) {
    return await this.profileService.createProfile(data);
  }

  @Post(':id')
  @SetAction(Actions.UPDATE)
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.profileService.updateProfile(id, data);
  }

  @Delete(':id')
  @SetAction(Actions.DELETE)
  async remove(@Param('id') id: string) {
    return await this.profileService.deleteProfile(id);
  }
}
