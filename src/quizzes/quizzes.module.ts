import { Module } from '@nestjs/common';
import { QuizzesService } from './service/quizzes.service';
import { QuizzesController } from './controller/quizzes.controller';
import { QuizzesRepository } from './repository/quizzes.repository';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizzesRepository],
  exports: [QuizzesService, QuizzesRepository],
})
export class QuizzesModule {}
