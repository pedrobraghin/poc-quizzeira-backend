import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO, UserDTO } from 'src/users/dtos';
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

  public generateJwt(payload: Record<string, any>) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async googleSignIn(userDto: CreateUserDTO) {
    const userExists = await this.usersRepository.findByEmail(userDto.email);
    let user: UserDTO;

    if (!userExists) {
      user = await this.registerUser(userDto);
    } else {
      user = await this.updateGoogleUser(userDto);
    }

    return this.generateJwt({
      sub: user.id,
    });
  }

  private async registerUser(user: CreateUserDTO) {
    const newUser = await this.usersRepository.create(user);
    return newUser;
  }

  private updateGoogleUser(userDto: CreateUserDTO) {
    const { name, email, picture, providerID } = userDto;

    const updatedUser = this.usersRepository.updateByProviderId(providerID, {
      name,
      email,
      picture,
    });

    return updatedUser;
  }
}
