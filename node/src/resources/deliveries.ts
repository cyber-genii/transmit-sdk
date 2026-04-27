import { TransmitClient } from '../client';
import { ApiDeliveryRequest, ApiDeliveryResponse, FareQuoteRequest } from '../types';

export class Deliveries {
  private client: TransmitClient;

  constructor(client: TransmitClient) {
    this.client = client;
  }

  /**
   * Create a new delivery via API
   */
  async create(data: ApiDeliveryRequest): Promise<ApiDeliveryResponse> {
    return this.client.post<ApiDeliveryResponse>('/api/v1/api-deliveries', data);
  }

  /**
   * List your API deliveries
   */
  async list(params?: Record<string, any>): Promise<ApiDeliveryResponse[]> {
    return this.client.get<ApiDeliveryResponse[]>('/api/v1/api-deliveries', params);
  }

  /**
   * Get delivery details by ID
   */
  async retrieve(deliveryId: string): Promise<ApiDeliveryResponse> {
    return this.client.get<ApiDeliveryResponse>(`/api/v1/api-deliveries/${deliveryId}`);
  }

  /**
   * Get delivery fare quote (does not require authentication necessarily)
   */
  async quote(data: FareQuoteRequest): Promise<any> {
    return this.client.post<any>('/api/v1/api-deliveries/quote', data);
  }
}
