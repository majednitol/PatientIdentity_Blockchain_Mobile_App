import { Module } from '@nestjs/common';
import { PathologistResolver } from './pathologist.resolver';
import { PathologistService } from './pathologist.service';

@Module({
  providers: [PathologistResolver, PathologistService]
})
export class PathologistModule {}
