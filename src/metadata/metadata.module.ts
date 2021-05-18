import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataResolver } from './metadata.resolver';

@Module({
  providers: [MetadataService, MetadataResolver],
})
export class MetadataModule {}
