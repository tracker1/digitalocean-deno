import { request } from '../request-tool.ts';

import { Action } from '../models/action.ts';

export class ActionService {
  constructor() {}

  /**
   * List all of the actions that have been executed on the current account.
   * Limited to 25 actions per page unless otherwise specified.
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const actions = await client.actions.getAllActions();
   * // Paginate actions, 10 per page, starting on page 1
   * actions = await client.actions.getAllActions(10, 1);
   * ```
   */
  public getAllActions(perPage?: number, page?: number): Promise<Action[]> {
    page = page || 1;
    perPage = perPage || 25;
    const url = `/actions?page=${page}&per_page=${perPage}`;
    return request.get(url).then(response => response.data.actions);
  }

  /**
   * Get an existing account action based on the provided ID
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const action = await client.actions.getExistingAction('specific-action-id');
   * ```
   */
  public getExistingAction(id: number): Promise<Action> {
    const url = `/actions/${id}`;
    return request.get(url).then(response => response.data.action);
  }
}
