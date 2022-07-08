import { request } from '../request-tool.ts';

import { FloatingIP } from '../models/floating-ip.ts';

export class FloatingIPService {
  constructor() {}

  /**
   * List all of the Floating IPs available on your account
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const floatingIPs = await client.floatingIPs.getAllFloatingIPs();
   * ```
   */
  public getAllFloatingIPs(): Promise<FloatingIP> {
    return request
      .get(`/floating_ips`)
      .then(response => response.data.floating_ips);
  }

  /**
   * Create a new Floating IP assigned to a Droplet
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const floatingIP =
   *    await client.floatingIPs.createFloatingIPForDroplet('droplet-id');
   * ```
   */
  public createFloatingIPForDroplet(dropletId: string): Promise<FloatingIP> {
    const data = { droplet_id: dropletId };
    return request
      .post(`/floating_ips`, data)
      .then(response => response.data.floating_ip);
  }

  /**
   * Create a Floating IP reserved to a Region
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const floatingIP =
   *    await client.floatingIPs.createFloatingIPForRegion('nyc3');
   * ```
   */
  public createFloatingIPForRegion(region: string): Promise<FloatingIP> {
    return request
      .post(`/floating_ips`, { region })
      .then(response => response.data.floating_ip);
  }

  /**
   * Show information about an existing Floating IP
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const floatingIP =
   *    await client.floatingIPs.getExistingFloatingIP('1.2.3.4');
   * ```
   */
  public getExistingFloatingIP(floatingIPAddress: string): Promise<FloatingIP> {
    return request
      .get(`/floating_ips/${floatingIPAddress}`)
      .then(response => response.data.floating_ip);
  }

  /**
   * Delete an existing Floating IP and remove it from your account
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.floatingIPs.deleteFloatingIP('1.2.3.4');
   * ```
   */
  public deleteFloatingIP(floatingIPAddress: string): Promise<void> {
    return request
      .delete(`/floating_ips/${floatingIPAddress}`)
      .then(() => undefined);
  }
}
