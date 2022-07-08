import { request } from '../request-tool.ts';

import { DomainRecord, DomainRecordRequest } from '../models/domain-record.ts';

export class DomainRecordService {
  constructor() {}

  /**
   * Get all records configured for a domain
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const records = await client.domainRecords.getAllDomainRecords('example.com');
   * ```
   */
  public getAllDomainRecords(domainName: string): Promise<DomainRecord[]> {
    return request
      .get(`/domains/${domainName}/records`)
      .then(response => response.data.domain_records);
  }

  /**
   * Create a new record for a domain
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const request = {
   *   type: 'A',
   *   name: 'www',
   *   data: '162.10.66.0',
   *   priority: null,
   *   port: null,
   *   ttl: 1800,
   *   weight: null,
   *   flags: null,
   *   tag: null
   * };
   * const record = await client.domainRecords
   *    .createDomainRecord('example.com', request);
   * ```
   */
  public createDomainRecord(
    domainName: string,
    domainRequest: DomainRecordRequest
  ): Promise<DomainRecord> {
    return request
      .post(`/domains/${domainName}/records`, domainRequest)
      .then(response => response.data.domain_record);
  }

  /**
   * Get a specific existing domain record
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const record = await client.domainRecords
   *    .getExistingDomainRecord('example.com', 'record-id');
   * ```
   */
  public getExistingDomainRecord(
    domainName: string,
    recordId: number
  ): Promise<DomainRecord> {
    return request
      .get(`/domains/${domainName}/records/${recordId}`)
      .then(response => response.data.domain_record);
  }

  /**
   * Update an existing domain record
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const request = {
   *   // Any valid domain record attribute can be changed
   *   name: 'blog'
   * };
   * const record = await client.domainRecords
   *    .updateDomainRecord('example.com', 'record-id', request);
   * ```
   */
  public updateDomainRecord(
    domainName: string,
    recordId: number,
    domainRequest: DomainRecordRequest
  ): Promise<DomainRecord> {
    return request
      .put(`/domains/${domainName}/records/${recordId}`, domainRequest)
      .then(response => response.data.domain_record);
  }

  /**
   * Delete a record for a domain
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.domainRecords.deleteDomainRecord('example.com', 'record-id');
   * ```
   */
  public deleteDomainRecord(
    domainName: string,
    recordId: number
  ): Promise<void> {
    return request
      .delete(`/domains/${domainName}/records/${recordId}`)
      .then(() => undefined);
  }
}
