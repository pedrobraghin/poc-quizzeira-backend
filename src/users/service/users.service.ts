import { JwtService } from '@nestjs/jwt';
import { PasswordUtils } from '../utils/password.utils';
import { CreateUserReqDTO } from '../dtos/request/create-user-req.dto';
import { UsersRepository } from './../repository/users.repository';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private generateJwt(payload: Record<string, any>) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async createUser(userDto: CreateUserReqDTO) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(
      userDto.email,
    );

    if (emailAlreadyExists) {
      throw new UnauthorizedException('Email already exists. Please login');
    }

    const { password, passwordConfirm, ...rest } = userDto;

    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords does not match');
    }

    const passwordHash = await PasswordUtils.hashPass(userDto.password);

    const user = await this.usersRepository.create({
      ...rest,
      passwordHash,
    });

    const token = this.generateJwt({ sub: user.id });

    return token;
  }

  async deleteUser(id: string, password: string) {
    const user = await this.usersRepository.findById(id);

    const passwordsMatch = await PasswordUtils.comparePass(
      password,
      user.passwordHash,
    );

    if (!passwordsMatch) {
      throw new ForbiddenException();
    }

    return await this.usersRepository.delete(id);
  }

  async updateUserPassword(id: string, password: string) {
    const passwordHash = await PasswordUtils.hashPass(password);

    await this.usersRepository.update(id, { passwordHash });
  }
}
