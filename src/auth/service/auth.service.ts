import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dtos';
import { UsersRepository } from 'src/users/repository/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  async validateUser(googleId: string) {
    const user = await this.usersRepository.findByEmail(googleId);

    return user;
  }

  generateJwt(payload: Record<string, any>) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async signIn(user: CreateUserDTO) {
    if (!user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const userExists = await this.usersRepository.findByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
    });
  }

  async registerUser(user: CreateUserDTO) {
    try {
      const newUser = await this.usersRepository.create(user);

      return this.generateJwt({
        sub: newUser.id,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
