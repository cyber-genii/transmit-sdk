import { TransmitClient } from '../client';

export class ApiKeys {
  private client: TransmitClient;

  constructor(client: TransmitClient) {
    this.client = client;
  }

  async list(): Promise<any[]> {
    return this.client.get<any[]>('/api/v1/developers/api-keys');
  }

  async create(data: { name: string; expires_in_days?: number; permissions?: string[] }): Promise<any> {
    return this.client.post<any>('/api/v1/developers/api-keys', data);
  }

  async retrieve(id: string): Promise<any> {
    return this.client.get<any>(`/api/v1/developers/api-keys/${id}`);
  }

  async revoke(id: string): Promise<void> {
    return this.client.post<void>(`/api/v1/developers/api-keys/${id}/revoke`);
  }

  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/api/v1/developers/api-keys/${id}`);
  }

  async getUsage(id: string): Promise<any> {
    return this.client.get<any>(`/api/v1/developers/api-keys/${id}/usage`);
  }
}
