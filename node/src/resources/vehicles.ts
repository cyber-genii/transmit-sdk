import { TransmitClient } from '../client';

export class Vehicles {
  private client: TransmitClient;

  constructor(client: TransmitClient) {
    this.client = client;
  }

  async getTypes(): Promise<any[]> {
    return this.client.get<any[]>('/api/v1/vehicles/types');
  }
}
