import { request } from '../request-tool.ts';

import { Snapshot } from '../models/snapshot.ts';

export type SnapshotType = 'all' | 'droplet' | 'volume';

export class SnapshotService {
  constructor() {}

  /**
   * Get all snapshots on the account.
   * Optionally provide a resource type to filter snapshots.
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * // Get all snapshots
   * const snapshots = await client.snapshots.getSnapshots();
   * // Get all droplet snapshots
   * snapshots = await client.snapshots.getSnapshots('droplet');
   * // Get all volume snapshots
   * snapshots = await client.snapshots.getSnapshots('volume');
   * ```
   */
  public getSnapshots(resourceType?: SnapshotType): Promise<Snapshot[]> {
    let url = `/snapshots`;
    if (resourceType && resourceType !== 'all') {
      url += `?resource_type=${resourceType}`;
    }
    return request.get(url).then(response => response.data.snapshots);
  }

  /**
   * Get a specific existing snapshot by ID
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const snapshot = await client.snapshots.getSnapshotById('snapshot-id');
   * ```
   */
  public getSnapshotById(snapshotId: string): Promise<Snapshot> {
    return request
      .get(`/snapshots/${snapshotId}`)
      .then(response => response.data.snapshot);
  }

  /**
   * Delete a specific snapshot by ID
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.snapshots.deleteSnapshot('snapshot-id');
   * ```
   */
  public deleteSnapshot(snapshotId: string): Promise<void> {
    return request.delete(`/snapshots/${snapshotId}`).then(() => undefined);
  }
}
