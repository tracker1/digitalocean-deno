import { Droplet } from './droplet.ts';

export interface Tag {
  name: string;
  resources?: {
    droplets?: {
      count?: number;
      last_tagged?: Droplet;
    };
  };
}
