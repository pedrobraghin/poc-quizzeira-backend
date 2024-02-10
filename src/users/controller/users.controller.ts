import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'src/common/req.dto';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Req() req: Request) {
    return req.user;
  }
}
