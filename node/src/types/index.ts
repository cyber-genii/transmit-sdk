export interface ClientOptions {
  apiKey: string;
  environment?: 'production' | 'sandbox';
  baseUrl?: string;
}

export interface ApiDeliveryRequest {
  sender_name: string;
  sender_phone: string;
  receiver_name: string;
  receiver_phone: string;
  pickup_latitude: number;
  pickup_longitude: number;
  pickup_address: string;
  dropoff_latitude: number;
  dropoff_longitude: number;
  dropoff_address: string;
  package_weight_kg: number;
  package_length_cm?: number;
  package_width_cm?: number;
  package_height_cm?: number;
  package_description: string;
  delivery_type: string;
  vehicle_type?: string;
  payment_method: string;
}

export interface FareQuoteRequest {
  pickup_latitude: number;
  pickup_longitude: number;
  dropoff_latitude: number;
  dropoff_longitude: number;
  package_weight_kg: number;
  package_length_cm?: number;
  package_width_cm?: number;
  package_height_cm?: number;
  delivery_type?: string;
}

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

export interface ApiDeliveryResponse {
  delivery_id: string;
  order_id: string;
  delivery_number: string;
  status: string;
  estimated_fare: string;
  created_at: string;
}

export interface ApiDeliveryListItem {
  order_id: string;
  order_number: string;
  status: string;
  total_amount: string;
  created_at: string;
}
