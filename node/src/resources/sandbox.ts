import { TransmitClient } from '../client';

export class Sandbox {
  private client: TransmitClient;

  constructor(client: TransmitClient) {
    this.client = client;
  }

  async createData(data: { type: string; parameters?: any }): Promise<any> {
    return this.client.post<any>('/api/v1/developers/sandbox', data);
  }

  async listData(): Promise<any[]> {
    return this.client.get<any[]>('/api/v1/developers/sandbox');
  }

  async clearData(): Promise<void> {
    return this.client.delete<void>('/api/v1/developers/sandbox');
  }
}
