import { TransmitClient } from '../client';
import { unwrapList } from '../response';
import {
  CalculateOrderFareRequest,
  CreateDeliveryOrderRequest,
  CreateDeliveryOrderResponse,
  DeliveryOrderTrackResponse,
} from '../types/deliveryOrders';

export class Orders {
  private client: TransmitClient;

  constructor(client: TransmitClient) {
    this.client = client;
  }

  async calculateFare(data: CalculateOrderFareRequest) {
    return this.client.post('/api/v1/delivery-orders/calculate-fare', data);
  }

  async create(data: CreateDeliveryOrderRequest): Promise<CreateDeliveryOrderResponse> {
    return this.client.post<CreateDeliveryOrderResponse>('/api/v1/delivery-orders', data);
  }

  async list(params?: Record<string, unknown>): Promise<CreateDeliveryOrderResponse[]> {
    return unwrapList<CreateDeliveryOrderResponse>(
      await this.client.get<unknown>('/api/v1/delivery-orders', params),
    );
  }

  async retrieve(orderId: string): Promise<CreateDeliveryOrderResponse> {
    return this.client.get<CreateDeliveryOrderResponse>(`/api/v1/delivery-orders/${orderId}`);
  }

  async track(orderId: string): Promise<DeliveryOrderTrackResponse> {
    return this.client.get<DeliveryOrderTrackResponse>(`/api/v1/delivery-orders/${orderId}/track`);
  }

  async cancel(orderId: string): Promise<void> {
    await this.client.post(`/api/v1/delivery-orders/${orderId}/cancel`);
  }
}
