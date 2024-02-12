import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { CommunityModule } from './community/community.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { LoggerMiddleware } from './common/logger.middleware';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        secure: process.env.NODE_ENV === 'production',
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        ignoreTLS: false,
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
    }),
    AuthModule,
    UsersModule,
    QuizzesModule,
    CommunityModule,
    EmailModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
