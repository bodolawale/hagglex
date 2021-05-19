import { Metadata, Image } from './metadata.model';
import { Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';
import meta from 'html-metadata-parser';
import { Cache } from 'cache-manager';

@Injectable()
export class MetadataService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getMetadata(url: string): Promise<Metadata> {
    if (!this.isValidUrl(url)) throw new Error('URL is not valid');

    const cachedData = await this.getCachedData(url);
    if (cachedData) return cachedData;

    const metadata = await meta.parser(url);

    const largestImage = this.getImage(metadata);

    const res = {
      title: metadata.meta.title || metadata.og.title,
      description: metadata.meta.description || metadata.og.description,
      largestImage,
    };

    await this.cacheData(url, res);

    return res;
  }

  private isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private getImage(metadata: any) {
    if (metadata.images.length > 0) {
      return this.getLargestImage(metadata.images);
    } else if (metadata.og.images.length > 0) {
      return this.getLargestImage(metadata.og.images);
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

  private async getCachedData(url: string): Promise<any> {
    const cachedData: string = await this.cacheManager.get(url);
    if (!cachedData) return;
    return JSON.parse(cachedData);
  }

  private async cacheData(url: string, data: any): Promise<void> {
    await this.cacheManager.set(url, JSON.stringify(data), { ttl: 60 });
  }
}
