import { axios } from './axios-instance.ts';
import { API_BASE_URL } from './conf/environment.ts';
import { AccountService } from './services/account-service.ts';
import { ActionService } from './services/actions-service.ts';
import { BillingHistoryService } from './services/billing-history-service.ts';
import { BlockStorageActionService } from './services/block-storage-actions-service.ts';
import { BlockStorageService } from './services/block-storage-service.ts';
import { CdnService } from './services/cdn-service.ts';
import { CertificateService } from './services/certificate-service.ts';
import { DomainRecordService } from './services/domain-record-service.ts';
import { DomainService } from './services/domain-service.ts';
import { DropletActionService } from './services/droplet-actions-service.ts';
import { DropletService } from './services/droplet-service.ts';
import { FirewallService } from './services/firewall-service.ts';
import { FloatingIPActionService } from './services/floating-ip-actions-service.ts';
import { FloatingIPService } from './services/floating-ip-service.ts';
import { ImageActionService } from './services/image-actions-service.ts';
import { ImageService } from './services/image-service.ts';
import { KubernetesService } from './services/kubernetes-service.ts';
import { LoadBalancerService } from './services/load-balancer-service.ts';
import { ProjectService } from './services/project-service.ts';
import { RegionService } from './services/region-service.ts';
import { SizeService } from './services/size-service.ts';
import { SnapshotService } from './services/snapshot-service.ts';
import { SshService } from './services/ssh-service.ts';
import { TagService } from './services/tag-service.ts';

export class DigitalOcean {
  public account: AccountService;
  public actions: ActionService;
  public billingHistory: BillingHistoryService;
  public blockStorage: BlockStorageService;
  public blockStorageActions: BlockStorageActionService;
  public cdn: CdnService;
  public certificates: CertificateService;
  public domains: DomainService;
  public domainRecords: DomainRecordService;
  public droplets: DropletService;
  public dropletActions: DropletActionService;
  public firewalls: FirewallService;
  public floatingIPs: FloatingIPService;
  public floatingIPActions: FloatingIPActionService;
  public images: ImageService;
  public imageActions: ImageActionService;
  public kubernetes: KubernetesService;
  public loadBalancers: LoadBalancerService;
  public projects: ProjectService;
  public regions: RegionService;
  public sizes: SizeService;
  public snapshots: SnapshotService;
  public ssh: SshService;
  public tags: TagService;

  constructor(private token: string, url = API_BASE_URL) {
    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    axios.defaults.headers.common['Content-Type'] = `application/json`;
    axios.defaults.baseURL = url;

    this.account = new AccountService();
    this.actions = new ActionService();
    this.billingHistory = new BillingHistoryService();
    this.blockStorage = new BlockStorageService();
    this.blockStorageActions = new BlockStorageActionService();
    this.cdn = new CdnService();
    this.certificates = new CertificateService();
    this.domains = new DomainService();
    this.domainRecords = new DomainRecordService();
    this.droplets = new DropletService();
    this.dropletActions = new DropletActionService();
    this.firewalls = new FirewallService();
    this.floatingIPs = new FloatingIPService();
    this.floatingIPActions = new FloatingIPActionService();
    this.images = new ImageService();
    this.imageActions = new ImageActionService();
    this.kubernetes = new KubernetesService();
    this.loadBalancers = new LoadBalancerService();
    this.projects = new ProjectService();
    this.regions = new RegionService();
    this.sizes = new SizeService();
    this.snapshots = new SnapshotService();
    this.ssh = new SshService();
    this.tags = new TagService();
  }
}
