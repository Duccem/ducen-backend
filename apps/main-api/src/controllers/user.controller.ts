import { CatchErrors, GeneralResponse, JwtAuthGuard, ResponseModeler, ResponseTypes } from '@ducen/adaptors';
import { UserAccessService } from '@ducen/core/modules/user/services/UserAccessService';
import { Body, Controller, Get, Post, Request, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

@Controller('user')
@UseFilters(CatchErrors)
@UseInterceptors(ResponseModeler)
export class UserController {
  constructor(private readonly userService: UserAccessService) {}
  @Post('login')
  async login(@Body() data: any) {
    return await this.userService.login(data.identifier, data.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-info')
  async getInfo(@Request() req) {
    console.log(req.user);
    return new GeneralResponse(ResponseTypes.SUCCESS, { data: {} });
  }
}
