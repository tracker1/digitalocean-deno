import { request } from '../request-tool.ts';

import { Region } from '../models/region.ts';

export class RegionService {
  constructor() {}

  /**
   * Get all regions
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const regions = await client.regions.getAllRegions();
   * ```
   */
  public getAllRegions(): Promise<Region[]> {
    return request.get(`/regions`).then(response => response.data.regions);
  }
}
