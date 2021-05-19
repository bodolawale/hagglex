import { Module, CacheModule } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataResolver } from './metadata.resolver';

@Module({
  imports: [CacheModule.register()],
  providers: [MetadataService, MetadataResolver],
})
export class MetadataModule {}
