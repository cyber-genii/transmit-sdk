import { TransmitClient } from './client';
import { ApiKeys } from './resources/apiKeys';
import { Deliveries } from './resources/deliveries';
import { Sandbox } from './resources/sandbox';
import { Vehicles } from './resources/vehicles';
import { Webhooks } from './resources/webhooks';
import { ClientOptions } from './types';

export class Transmit {
  public deliveries: Deliveries;
  public apiKeys: ApiKeys;
  public webhooks: Webhooks;
  public sandbox: Sandbox;
  public vehicles: Vehicles;
  private client: TransmitClient;

  constructor(options: ClientOptions) {
    this.client = new TransmitClient(options);
    
    // Initialize API resources
    this.deliveries = new Deliveries(this.client);
    this.apiKeys = new ApiKeys(this.client);
    this.webhooks = new Webhooks(this.client);
    this.sandbox = new Sandbox(this.client);
    this.vehicles = new Vehicles(this.client);
  }
}

// Export types
export * from './types';
