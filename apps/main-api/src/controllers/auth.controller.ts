import { CatchErrors, FirebaseSender, GeneralResponse, MailSender, ResponseModeler, ResponseTypes } from '@ducen/adaptors';
import { UserAccessService } from '@ducen/core';
import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
@UseFilters(CatchErrors)
@UseInterceptors(ResponseModeler)
export class AuthController {
  constructor(private readonly userAccessService: UserAccessService, private firebaseSender: FirebaseSender, private mailSender: MailSender) {}
  @Post('sign-up')
  async sign(@Body() data: any) {
    return await this.userAccessService.signUp(data);
  }

  @Post('login')
  async login(@Body() data: any) {
    return await this.userAccessService.login(data.identifier, data.password);
  }

  @Post('register-token/:id/:token')
  async registerToken(@Param('id') id: string, @Param('token') token: string) {
    return await this.userAccessService.registerToken(id, token);
  }

  @Post('send-notification/:id')
  async sendNotification(@Param('id') id: string) {
    await this.firebaseSender.SendPushNotification(id, 'Hola', 'Prueba de notificación');
    return new GeneralResponse(ResponseTypes.SUCCESS, { data: null });
  }

  @Post('send-mail/:id')
  async sendMail(@Param('id') id: string) {
    await this.mailSender.SendEmail(id, 'Hola', 'hi');
    return new GeneralResponse(ResponseTypes.SUCCESS, { data: null });
  }

  @Get('/policy')
  async policy(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    return await this.userAccessService.externalSign(req.user.user);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req: any): Promise<any> {
    return await this.userAccessService.externalSign(req.user.user);
  }

  @Get('/twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/twitter/redirect')
  @UseGuards(AuthGuard('twitter'))
  async twitterLoginRedirect(@Req() req: any): Promise<any> {
    return await this.userAccessService.externalSign(req.user.user);
  }

  @Get('/linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/linkedin/redirect')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLoginRedirect(@Req() req: any): Promise<any> {
    return await this.userAccessService.externalSign(req.user.user);
  }

  @Get('/github')
  @UseGuards(AuthGuard('github'))
  async githubLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/github/redirect')
  @UseGuards(AuthGuard('github'))
  async githubLoginRedirect(@Req() req: any): Promise<any> {
    return await this.userAccessService.externalSign(req.user.user);
  }
}
