import { CatchErrors, ResponseModeler } from '@ducen/adaptors';
import { UserService } from '@ducen/core';
import { Controller, Get, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
@UseFilters(CatchErrors)
@UseInterceptors(ResponseModeler)
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('my-info')
  async getInfo(@Req() req) {
    const user = req.user;
    return this.userService.getUser(user.userId);
  }
}
