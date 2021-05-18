import { Metadata } from './metadata.model';
import { Injectable } from '@nestjs/common';
import urlMetadata from 'url-metadata';
import meta from 'html-metadata-parser';

@Injectable()
export class MetadataService {
  async getMetadata(url: string): Promise<Metadata> {
    if (!this.isValidUrl(url)) throw new Error('URL is not valid');

    const metadata = await urlMetadata(url);

    const meet = await meta.parser(url);
    console.log(meet.images);

    const largestImage = this.getLargestImage(metadata);

    return {
      title: metadata.title,
      description: metadata.description,
      largestImage: metadata.image,
    };
  }

  private isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private getLargestImage(metadata: any): string {
    console.log(metadata);
    return 'Hello';
  }
}
