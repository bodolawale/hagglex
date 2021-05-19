import { Metadata, Image } from './metadata.model';
import { Injectable } from '@nestjs/common';
import meta from 'html-metadata-parser';

@Injectable()
export class MetadataService {
  async getMetadata(url: string): Promise<Metadata> {
    if (!this.isValidUrl(url)) throw new Error('URL is not valid');

    const metadata = await meta.parser(url);
    console.log(metadata);

    let largestImage = null;

    if (metadata.images.length > 0) {
      largestImage = this.getLargestImage(metadata.images);
    } else if (metadata.og.images.length > 0) {
      largestImage = this.getLargestImage(metadata.og.images);
    }

    return {
      title: metadata.meta.title || metadata.og.title,
      description: metadata.meta.description || metadata.og.description,
      largestImage,
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

  private getLargestImage(images: Image[]): string {
    let maxSize = -1;
    let largestImage: Image = null;

    images.forEach((image) => {
      const imageSize = image.height || 1 * image.width || 1;
      if (imageSize > maxSize) {
        largestImage = image;
        maxSize = imageSize;
      }
    });

    return largestImage.url;
  }
}
