import { request } from '../request-tool.ts';

import { Action } from '../models/action.ts';
import { Backup } from '../models/backup.ts';
import { Droplet, DropletRequest } from '../models/droplet.ts';
import { Kernel } from '../models/kernel.ts';
import { Snapshot } from '../models/snapshot.ts';

export class DropletService {
  constructor() {}

  /**
   * Create a new droplet
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const request = {
   *   name: 'example.com',
   *   region: 'nyc3',
   *   size: 's-1vcpu-1gb',
   *   image: 'ubuntu-16-04-x64',
   *   ssh_keys: null,
   *   backups: false,
   *   ipv6: true,
   *   user_data: null,
   *   private_networking: null,
   *   volumes: null,
   *   tags: [
   *     'web'
   *   ]
   * };
   * const droplet = await client.droplets.createNewDroplet(request);
   * ```
   */
  public createNewDroplet(dropletRequest: DropletRequest): Promise<Droplet> {
    return request
      .post(`/droplets`, dropletRequest)
      .then(response => response.data.droplet);
  }

  /**
   * Create multiple droplets with the same specs but different names
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const request = {
   *   names: [
   *     'sub-01.example.com',
   *     'sub-02.example.com'
   *   ],
   *   region: 'nyc3',
   *   size: 's-1vcpu-1gb',
   *   image: 'ubuntu-16-04-x64',
   *   ssh_keys: null,
   *   backups: false,
   *   ipv6: true,
   *   user_data: null,
   *   private_networking: null,
   *   tags: [
   *     'web'
   *   ]
   * };
   * const droplets = await client.droplets.createMultipleDroplets(request);
   * ```
   */
  public createMultipleDroplets(
    dropletsRequest: DropletRequest
  ): Promise<Droplet[]> {
    return request
      .post(`/droplets`, dropletsRequest)
      .then(response => response.data.droplets);
  }

  /**
   * Get a specific existing droplet by ID
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const droplet = await client.droplets.getExistingDroplet('droplet-id');
   * ```
   */
  public getExistingDroplet(dropletId: number): Promise<Droplet> {
    return request
      .get(`/droplets/${dropletId}`)
      .then(response => response.data.droplet);
  }

  /**
   * Get all droplets on the account
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const droplets = await client.droplets.getAllDroplets();
   * ```
   */
  public getAllDroplets(): Promise<Droplet[]> {
    return request.get(`/droplets`).then(response => response.data.droplets);
  }

  /**
   * Get all droplets on the account that has a given tag
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const droplets = await client.droplets.getDropletsByTag('tag-name');
   * ```
   */
  public getDropletsByTag(tag: string): Promise<Droplet[]> {
    return request
      .get(`/droplets?tag_name=${tag}`)
      .then(response => response.data.droplets);
  }

  /**
   * Retrieve a list of all kernels available to a Droplet
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const kernels = await client.droplets.getAvailableKernelsForDroplet('droplet-id');
   * ```
   */
  public getAvailableKernelsForDroplet(dropletId: number): Promise<Kernel[]> {
    return request
      .get(`/droplets/${dropletId}/kernels`)
      .then(response => response.data.kernels);
  }

  /**
   * Retrieve the snapshots that have been created from a Droplet
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const snapshots = await client.droplets.getSnapshotsForDroplet('droplet-id');
   * ```
   */
  public getSnapshotsForDroplet(dropletId: number): Promise<Snapshot[]> {
    return request
      .get(`/droplets/${dropletId}/snapshots`)
      .then(response => response.data.snapshots);
  }

  /**
   * Retrieve any backups associated with a Droplet
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const backups = await client.droplets.getBackupsForDroplet('droplet-id');
   * ```
   */
  public getBackupsForDroplet(dropletId: number): Promise<Backup[]> {
    return request
      .get(`/droplets/${dropletId}/backups`)
      .then(response => response.data.backups);
  }

  /**
   * Retrieve all actions that have been executed on a Droplet
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const actions = await client.droplets.getDropletActions('droplet-id');
   * ```
   */
  public getDropletActions(dropletId: number): Promise<Action[]> {
    return request
      .get(`/droplets/${dropletId}/actions`)
      .then(response => response.data.actions);
  }

  /**
   * Delete a specific droplet by ID
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.droplets.deleteDroplet('droplet-id');
   * ```
   */
  public deleteDroplet(dropletId: number): Promise<void> {
    return request.delete(`/droplets/${dropletId}`).then(() => undefined);
  }

  /**
   * Delete Droplets by a tag
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.droplets.deleteDropletsByTag('tag');
   * ```
   */
  public deleteDropletsByTag(tag: string): Promise<void> {
    return request.delete(`/droplets?tag_name=${tag}`).then(() => undefined);
  }

  /**
   * Retrieve a list of Droplets that are running on the same physical server
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const droplets = await client.droplets.getNeighborsForDroplet('droplet-id');
   * ```
   */
  public getNeighborsForDroplet(dropletId: number): Promise<Droplet[]> {
    return request
      .delete(`/droplets/${dropletId}/neighbors`)
      .then(response => response.data.droplets);
  }

  /**
   * Retrieve a list of any Droplets that are running on the same physical hardware
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const droplets = await client.droplets.getDropletNeighbors();
   * ```
   */
  public getDropletNeighbors(): Promise<Droplet[][]> {
    return request
      .delete(`/reports/droplet_neighbors`)
      .then(response => response.data.neighbors);
  }
}
