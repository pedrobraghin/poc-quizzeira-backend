import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [],
})
export class QuestionModule {}
