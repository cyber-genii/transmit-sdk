export interface ClientOptions {
  apiKey?: string;
  environment?: 'production' | 'sandbox';
  baseUrl?: string;
}

/** @deprecated Use types from ./deliveryOrders */
export type {
  CreateDeliveryOrderRequest as ApiDeliveryRequest,
  CreateDeliveryOrderResponse as ApiDeliveryResponse,
  CalculateOrderFareRequest as FareQuoteRequest,
} from './deliveryOrders';

export interface CreateWebhookRequest {
  url: string;
  events: string[];
  secret?: string;
}

export interface CreateApiKeyRequest {
  name: string;
  environment: 'production' | 'sandbox';
  scopes?: string[];
}

export interface CreateSandboxDataRequest {
  entity_type: string;
  entity_id: string;
  data: Record<string, unknown>;
}

export interface ApiDeliveryListItem {
  order_id: string;
  order_number: string;
  status: string;
  total_amount: string;
  created_at: string;
}
