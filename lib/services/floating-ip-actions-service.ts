import { request } from '../request-tool.ts';

import { Action } from '../models/action.ts';

export class FloatingIPActionService {
  constructor() {}

  /**
   * Assign an existing Floating IP to a Droplet
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const action = await client.floatingIPActions
   *    .assignFloatingIPToDroplet('1.2.3.4', 'droplet-id');
   * ```
   */
  public assignFloatingIPToDroplet(
    floatingIPAddress: string,
    dropletId: string
  ): Promise<Action> {
    const data = {
      droplet_id: dropletId,
      type: 'assign'
    };
    return request
      .post(`/floating_ips/${floatingIPAddress}/actions`, data)
      .then(response => response.data.action);
  }

  /**
   * Unassign an existing Floating IP
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const action = await client.floatingIPActions
   *    .unassignFloatingIP('1.2.3.4');
   * ```
   */
  public unassignFloatingIP(floatingIPAddress: string): Promise<Action> {
    const data = {
      type: 'unassign'
    };
    return request
      .post(`/floating_ips/${floatingIPAddress}/actions`, redataquest)
      .then(response => response.data.action);
  }

  /**
   * Retrieve all actions that have been executed on a Floating IP
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const actions = await client.floatingIPActions
   *    .getAllFloatingIPActions('1.2.3.4');
   * ```
   */
  public getAllFloatingIPActions(floatingIPAddress: string): Promise<Action[]> {
    return request
      .get(`/floating_ips/${floatingIPAddress}/actions`)
      .then(response => response.data.actions);
  }

  /**
   * Retrieve the status of a Floating IP action
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const action = await client.floatingIPActions
   *    .getExistingFloatingIPAction('1.2.3.4', 'action-id');
   * ```
   */
  public getExistingFloatingIPAction(
    floatingIPAddress: string,
    actionId: string
  ): Promise<Action> {
    return request
      .get(`/floating_ips/${floatingIPAddress}/actions/${actionId}`)
      .then(response => response.data.action);
  }
}
