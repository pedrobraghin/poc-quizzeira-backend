import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ForgotPassReqDTO, LoginReqDTO, ResetPasswordReqDTO } from '../dtos';
import { CookieUtils } from '../utils/cookie.utils';
import { AuthService } from '../service/auth.service';
import { GoogleOAuthGuard } from '../guards/google-oauth.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(HttpStatus.OK)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.googleSignIn(req.user);

    CookieUtils.setAccesTokenCookie(token, res);

    return res.redirect(this.configService.get('FRONT_URL'));
  }

  @Post()
  async login(@Body() body: LoginReqDTO, @Res() res: Response) {
    const token = await this.authService.login(body.email, body.password);

    CookieUtils.setAccesTokenCookie(token, res);

    return res.redirect(this.configService.get('FRONT_URL'));
  }

  @Post('forgot-password')
  @Throttle({ default: { limit: 1, ttl: 15000 } })
  @HttpCode(HttpStatus.OK)
  async forgotPass(@Body() body: ForgotPassReqDTO, @Res() res: Response) {
    await this.authService.forgotPass(body.email);
    return res.end();
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() body: ResetPasswordReqDTO, @Res() res: Response) {
    await this.authService.resetPassword(body.token, body.password);
    return res.end();
  }
}
