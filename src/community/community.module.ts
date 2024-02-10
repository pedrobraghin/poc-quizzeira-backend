import { Module } from '@nestjs/common';
import { CommunityService } from './service/community.service';
import { CommunityRepository } from './repository/community.repository';
import { CommunityController } from './controller/community.controller';

@Module({
  controllers: [CommunityController],
  providers: [CommunityService, CommunityRepository],
})
export class CommunityModule {}
