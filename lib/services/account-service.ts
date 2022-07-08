import { request } from '../request-tool.ts';

import { Account } from '../models/account.ts';

export class AccountService {
  constructor() {}

  /**
   * Get the account information associated with the provided credentials
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const account = await client.account.getUserInformation();
   * ```
   */
  public getUserInformation(): Promise<Account> {
    return request.get(`/account`).then(response => response.data.account);
  }
}
