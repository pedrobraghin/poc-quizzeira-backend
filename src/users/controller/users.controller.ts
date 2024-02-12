import { UsersService } from './../service/users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'src/common/req.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserReqDTO } from '../dtos/request/create-user-req.dto';
import { CookieUtils } from 'src/auth/utils/cookie.utils';
import { UserBuilder } from '../builders/user.builder';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Req() req: Request) {
    const user = UserBuilder.publicUser(req.user);
    return user;
  }

  @Post()
  async createUser(@Body() body: CreateUserReqDTO, @Res() res: Response) {
    const token = await this.usersService.createUser(body);

    CookieUtils.setAccesTokenCookie(token, res);

    return res.status(HttpStatus.CREATED).json({
      access_token: token,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(
    @Req() req: Request,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = UserBuilder.publicUser(req.user);
    await this.usersService.deleteUser(user.id, password);
    CookieUtils.logOut(res);

    return res.status(HttpStatus.OK).send();
  }
}
