import { axios } from '../axios-instance.ts';

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
    return new Promise((resolve, reject) => {
      axios
        .get(`/regions`)
        .then(response => {
          // Return actual regions instead of wrapped regions
          resolve(response.data.regions);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
