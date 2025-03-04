import { request } from '../request-tool.ts';

import { CdnEndpoint, CdnEndpointRequest } from '../models/cdn.ts';

export class CdnService {
  constructor() {}

  /**
   * List all of the CDN endpoints available on your account
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const endpoints = await client.cdn.getAllEndpoints();
   * ```
   */
  public getAllEndpoints(): Promise<CdnEndpoint[]> {
    return request
      .get(`/cdn/endpoints`)
      .then(response => response.data.endpoints);
  }

  /**
   * Get an existing CDN endpoint
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const endpoint = await client.cdn.getExistingEndpoint('endpoint-id');
   * ```
   */
  public getExistingEndpoint(id: string): Promise<CdnEndpoint> {
    return request
      .get(`/cdn/endpoints/${id}`)
      .then(response => response.data.endpoint);
  }

  /**
   * Create a new CDN endpoint
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const request = {
   *   "origin": "static-images.nyc3.digitaloceanspaces.com",
   *   "ttl": 3600
   * };
   * const endpoint = await client.cdn.createEndpoint(request);
   * ```
   */
  public async createEndpoint(
    endpoint: CdnEndpointRequest
  ): Promise<CdnEndpoint> {
    if (!this.endpointIsValid(endpoint)) {
      throw new Error('Required fields missing from Endpoint Object');
    }
    return await request
      .post(`/cdn/endpoints`, endpoint)
      .then(response => response.data.endpoint);
  }

  /**
   * Update the ttl of an existing CDN endpoint
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const endpoint = await client.cdn.updateEndpoint('endpoint-id', 1800);
   * ```
   */
  public updateEndpoint(id: string, ttl: number): Promise<CdnEndpoint> {
    return request
      .put(`/cdn/endpoints/${id}`, { ttl })
      .then(response => response.data.endpoint);
  }

  /**
   * Delete an existing CDN endpoint
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const endpoint = await client.cdn.deleteEndpoint('endpoint-id');
   * ```
   */
  public deleteEndpoint(id: string): Promise<void> {
    return request.delete(`/cdn/endpoints/${id}`).then(() => undefined);
  }

  /**
   * Purge cached content from a CDN endpoint
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const files = [
   *   'assets/img/hero.png',
   *   'assets/css/*'
   * ];
   * const endpoint = await client.cdn.purgeEndpointCache('endpoint-id', files);
   * ```
   */
  public purgeEndpointCache(id: string, files: string[]): Promise<void> {
    return request
      .delete(`/cdn/endpoints/${id}/cache`, {
        data: { files }
      })
      .then(() => undefined);
  }

  ////////// Validation Methods //////////
  private endpointIsValid(end: CdnEndpointRequest): boolean {
    if (!end.origin) {
      return false;
    }
    return true;
  }
}
