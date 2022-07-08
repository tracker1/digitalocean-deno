import { request } from '../request-tool.ts';

import { Size } from '../models/size.ts';

export class SizeService {
  constructor() {}

  /**
   * Get all sizes
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const sizes = await client.sizes.getAllSizes();
   * ```
   */
  public getAllSizes(): Promise<Size[]> {
    return request.get(`/sizes`).then(response => response.data.sizes);
  }
}
