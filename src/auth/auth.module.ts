import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { EmailService } from 'src/email/service/email.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    EmailService,
  ],
  exports: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
