import { Metadata } from './metadata.model';
import { MetadataService } from './metadata.service';
import { Args, Resolver, Query } from '@nestjs/graphql';

@Resolver((of) => Metadata)
export class MetadataResolver {
  constructor(private MetadataService: MetadataService) {}

  @Query((returns) => Metadata)
  async Metadata(@Args('url', { type: () => String }) url: string) {
    const metadata = this.MetadataService.getMetadata(url);
    return metadata;
  }
}
