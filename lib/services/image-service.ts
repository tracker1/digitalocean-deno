import { request } from '../request-tool.ts';

import { Action } from '../models/action.ts';
import { Image } from '../models/image.ts';

export class ImageService {
  constructor() {}

  /**
   * Get all images on account
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const images = await client.images.getAllImages();
   * ```
   */
  public getAllImages(): Promise<Image[]> {
    return request.get(`/images`).then(response => response.data.images);
  }

  /**
   * Get all distribution images
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const images = await client.images.getAllDistributionImages();
   * // Paginate images, 10 per page, starting on page 1
   * images = await client.images.getAllDistributionImages(10, 1);
   * ```
   */
  public getAllDistributionImages(
    perPage?: number,
    page?: number
  ): Promise<Image[]> {
    page = page ? page : 1;
    perPage = perPage ? perPage : 25;
    return request
      .get(`/images?type=distribution&page=${page}&per_page=${perPage}`)
      .then(response => response.data.images);
  }

  /**
   * Get all application images
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const images = await client.images.getAllApplicationImages();
   * // Paginate application images, 10 per page, starting on page 1
   * images = await client.images.getAllApplicationImages(10, 1);
   * ```
   */
  public getAllApplicationImages(
    perPage?: number,
    page?: number
  ): Promise<Image[]> {
    page = page ? page : 1;
    perPage = perPage ? perPage : 25;
    return request
      .get(`/images?type=application&page=${page}&per_page=${perPage}`)
      .then(response => response.data.images);
  }

  /**
   * Get the private images of a user
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const images = await client.images.getUserImages();
   * // Paginate user images, 10 per page, starting on page 1
   * images = await client.images.getUserImages(10, 1);
   * ```
   */
  public getUserImages(perPage?: number, page?: number): Promise<Image[]> {
    page = page ? page : 1;
    perPage = perPage ? perPage : 25;
    return request
      .get(`/images?private=true&page=${page}&per_page=${perPage}`)
      .then(response => response.data.images);
  }

  /**
   * Get all actions that have been executed on an image
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const actions = await client.images.getImageActions('image-id');
   * ```
   */
  public getImageActions(imageId: number): Promise<Action[]> {
    return request
      .get(`/images/${imageId}/actions`)
      .then(response => response.data.actions);
  }

  /**
   * Get information about an image
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const image = await client.images.getExistingImage('image-id');
   * ```
   */
  public getExistingImage(imageId: number): Promise<Image> {
    return request
      .get(`/images/${imageId}`)
      .then(response => response.data.image);
  }

  /**
   * Get information about an image by image slug
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const image = await client.images.getExistingImageBySlug('image-slug');
   * ```
   */
  public getExistingImageBySlug(imageSlug: string): Promise<Image> {
    return request
      .get(`/images/${imageSlug}`)
      .then(response => response.data.image);
  }

  /**
   * Update an image name
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const image = await client.images.updateImageName('image-id', 'New Image Name');
   * ```
   */
  public updateImageName(imageId: number, name: string): Promise<Image> {
    return request
      .put(`/images/${imageId}`, { name })
      .then(response => response.data.image);
  }

  /**
   * Delete an image
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.images.deleteImage('image-id');
   * ```
   */
  public async deleteImage(imageId: number): Promise<void> {
    await request.delete(`/images/${imageId}`);
  }
}
