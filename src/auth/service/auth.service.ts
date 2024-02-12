import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO, UserDTO } from 'src/users/dtos';
import { UsersService } from 'src/users/service/users.service';
import { EmailService } from './../../email/service/email.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.repository';
import { PasswordUtils } from 'src/users/utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
    private usersService: UsersService,
    private configService: ConfigService,
    private emailService: EmailService,
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

  public generateResetPassJwt(email: string) {
    return this.jwtService.sign(
      { sub: email },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_RESET_PASS_EXPIRES_IN'),
      },
    );
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

  async login(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordsMatch = await PasswordUtils.comparePare(
      password,
      user.passwordHash,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid email or password');
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

  async forgotPass(email: string) {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists || userExists.providerID !== undefined) return;

    const jwt = this.generateResetPassJwt(email);

    const frontUrl = String(this.configService.get('FRONT_URL'))
      .concat(this.configService.get('RECOVERY_PASS_PAGE'))
      .concat('?', new URLSearchParams({ jwt }).toString());

    await this.emailService.sendEmail({
      to: email,
      subject: 'Recuperação de senha - Quizzeira',
      html: `
        <div>
          <span>Você solicitou uma recuperação de senha. Clique no link abaixo para definir uma nova senha</span>
          <span>Se não foi você, por favor entre em contato com o nosso suporte o quanto antes.</span>
          <a href="${frontUrl}" target="_blank">Redefinir senha</a>
        </div>
      `,
    });
  }

  async resetPassword(token: string, password: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      const userEmail = payload.sub;

      const user = await this.usersRepository.findByEmail(userEmail);

      if (!user) {
        throw new UnauthorizedException();
      }

      await this.usersService.updateUserPassword(user.id, password);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
