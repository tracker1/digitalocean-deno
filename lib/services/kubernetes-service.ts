import { request } from '../request-tool.ts';

import {
  KubernetesCluster,
  KubernetesClusterRequest,
  KubernetesOptions,
  KubernetesVersion,
  KubernetesWorkerNodePool
} from '../models/kubernetes-cluster.ts';

export class KubernetesService {
  constructor() {}

  /**
   * Create a new kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const request = {
   *   "name": "prod-cluster-01",
   *   "region": "nyc1",
   *   "version": "1.14.1-do.4",
   *   "tags": [
   *     "production",
   *     "web-team"
   *   ],
   *   "node_pools": [
   *     {
   *       "size": "s-1vcpu-2gb",
   *       "count": 3,
   *       "name": "frontend-pool",
   *       "tags": [
   *         "frontend"
   *       ]
   *     },
   *     {
   *       "size": "c-4",
   *       "count": 2,
   *       "name": "backend-pool"
   *     }
   *   ]
   * };
   * const cluster = await client.kubernetes.createCluster(request);
   * ```
   */
  public createCluster(
    cluster: KubernetesClusterRequest
  ): Promise<KubernetesCluster> {
    return request.post(`/kubernetes/clusters`, cluster).then(
      response =>
        // Return actual cluster instead of wrapped cluster
        response.data.kubernetes_cluster
    );
  }

  /**
   * Get a specific existing kubernetes cluster by ID
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const cluster = await client.kubernetes.getCluster('cluster-id');
   * ```
   */
  public getCluster(clusterId: string): Promise<KubernetesCluster> {
    return request.get(`/kubernetes/clusters/${clusterId}`).then(
      response =>
        // Return actual cluster instead of wrapped cluster
        response.data.kubernetes_cluster
    );
  }

  /**
   * Get all existing kubernetes clusters
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const clusters = await client.kubernetes.getAllClusters();
   * ```
   */
  public getAllClusters(): Promise<KubernetesCluster[]> {
    return request.get(`/kubernetes/clusters`).then(
      response =>
        // Return actual cluster instead of wrapped cluster
        response.data.kubernetes_clusters
    );
  }

  /**
   * Update an existing kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const request = {
   *   "name": "stage-cluster-01",
   *   "tags": [
   *     "staging",
   *     "web-team"
   *   ]
   * };
   * const cluster = await client.kubernetes.updateCluster('cluster-id', request);
   * ```
   */
  public updateCluster(
    clusterId: string,
    cluster: KubernetesCluster
  ): Promise<KubernetesCluster> {
    return request.put(`/kubernetes/clusters/${clusterId}`, cluster).then(
      response =>
        // Return actual cluster instead of wrapped cluster
        response.data.kubernetes_cluster
    );
  }

  /**
   * Get available upgrades for an existing kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const upgrades = await client.kubernetes.getAvailableUpgradesForCluster('cluster-id');
   * ```
   */
  public getAvailableUpgradesForCluster(
    clusterId: string
  ): Promise<KubernetesVersion[]> {
    return request.get(`/kubernetes/clusters/${clusterId}/upgrades`).then(
      response =>
        // Return actual versions instead of wrapped versions
        response.data.available_upgrade_versions
    );
  }

  /**
   * Upgrade the version of an existing kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.kubernetes.upgradeExistingCluster('cluster-id', "1.12.3-do.1");
   * ```
   */
  public async upgradeExistingCluster(
    clusterId: string,
    version: string
  ): Promise<void> {
    await request.post(`/kubernetes/clusters/${clusterId}/upgrade`, {
      version
    });
  }

  /**
   * Delete an existing kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.kubernetes.deleteCluster('cluster-id');
   * ```
   */
  public async deleteCluster(clusterId: string): Promise<void> {
    await request.delete(`/kubernetes/clusters/${clusterId}`);
  }

  /**
   * Get the contents of the kubeconfig yaml file for use with a Kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const kubeconfig = await client.kubernetes.getClusterKubeconfig('cluster-id');
   * ```
   */
  public getClusterKubeconfig(clusterId: string): Promise<string> {
    return request
      .get(`/kubernetes/clusters/${clusterId}/kubeconfig`)
      .then(response => response.data);
  }

  /**
   * Get an existing node pool on a kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const nodePool = await client.kubernetes.getExistingNodePoolForCluster('cluster-id', 'pool-id');
   * ```
   */
  public getExistingNodePoolForCluster(
    clusterId: string,
    poolId: string
  ): Promise<KubernetesWorkerNodePool> {
    return request
      .get(`/kubernetes/clusters/${clusterId}/node_pools/${poolId}`)
      .then(response => response.data.node_pool);
  }

  /**
   * Get all existing node pools on a kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const nodePools = await client.kubernetes.getAllNodePoolsForCluster('cluster-id');
   * ```
   */
  public getAllNodePoolsForCluster(
    clusterId: string
  ): Promise<KubernetesWorkerNodePool[]> {
    return request
      .get(`/kubernetes/clusters/${clusterId}/node_pools`)
      .then(response => response.data.node_pools);
  }

  /**
   * Add a node pool to a kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const request = {
   *   "size": "s-2vcpu-4gb",
   *   "count": 1,
   *   "name": "pool-02",
   *   "tags": [
   *     "web"
   *   ]
   * };
   * const nodePool = await client.kubernetes.addNodePoolToCluster('cluster-id', request);
   * ```
   */
  public addNodePoolToCluster(
    clusterId: string,
    nodePool: KubernetesWorkerNodePool
  ): Promise<KubernetesWorkerNodePool> {
    return request
      .post(`/kubernetes/clusters/${clusterId}/node_pools`, nodePool)
      .then(response => response.data.node_pool);
  }

  /**
   * Update an existing node pool in a kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const request = {
   *   "name": "frontend",
   *   "count": 1,
   *   "tags": [
   *     "frontend"
   *   ]
   * };
   * const nodePool = await client.kubernetes.updateNodePoolForCluster('cluster-id', 'pool-id', request);
   * ```
   */
  public updateNodePoolForCluster(
    clusterId: string,
    nodePoolId: string,
    nodePool: KubernetesWorkerNodePool
  ): Promise<KubernetesWorkerNodePool> {
    return request
      .post(
        `/kubernetes/clusters/${clusterId}/node_pools/${nodePoolId}`,
        nodePool
      )
      .then(response => response.data.node_pool);
  }

  /**
   * Delete an existing node pool from a kubernetes cluster
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.kubernetes.deleteNodePoolFromCluster('cluster-id', 'pool-id');
   * ```
   */
  public async deleteNodePoolFromCluster(
    clusterId: string,
    nodePoolId: string
  ): Promise<void> {
    await request.delete(
      `/kubernetes/clusters/${clusterId}/node_pools/${nodePoolId}`
    );
  }

  /**
   * Delete an existing node from a node pool in a kubernetes cluster.
   * Optionally specify to skip node draining or to replace with a new node after deletion.
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * await client.kubernetes.deleteNodeFromNodePoolForCluster('cluster-id', 'pool-id', 'node-id', false, false);
   * ```
   */
  public async deleteNodeFromNodePoolForCluster(
    clusterId: string,
    nodePoolId: string,
    nodeId: string,
    skipDrain?: boolean,
    replace?: boolean
  ): Promise<void> {
    const url = `/kubernetes/clusters/${clusterId}/node_pools/${nodePoolId}/nodes/${nodeId}?skip_drain=${
      skipDrain ? 1 : 0
    }&replace=${replace ? 1 : 0}`;
    await request.delete(url);
  }

  /**
   * Get available Kubernetes versions, regions that support Kubernetes, and the available node sizes.
   *
   * ### Example
   * ```js
   * import { DigitalOcean } from 'digitalocean-js';
   *
   * const client = new DigitalOcean('your-api-key');
   * const options = await client.kubernetes.getKubernetesOptions();
   * ```
   */
  public getKubernetesOptions(): Promise<KubernetesOptions> {
    return request
      .get(`/kubernetes/options`)
      .then(response => response.data.options);
  }
}
