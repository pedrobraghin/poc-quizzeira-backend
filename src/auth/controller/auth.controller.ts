import { ConfigService } from '@nestjs/config';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from '../guards/google-oauth.guard';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { CookieUtils } from '../utils/cookie.utils';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);

    CookieUtils.setAccesTokenCookie(token, res);

    return res.redirect(this.configService.get('FRONT_URL'));
  }
}
