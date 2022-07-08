import { Droplet } from './droplet.ts';
import { Region } from './region.ts';

export interface FloatingIP {
  ip: string;
  region: Region;
  droplet: Droplet;
}
