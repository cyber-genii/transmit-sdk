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
  vehicle_type: string;
  payment_method: string;
}

export interface FareQuoteRequest {
  pickup_address: string;
  dropoff_address: string;
  vehicle_type: string;
  package_weight: number;
}

export interface CreateWebhookRequest {
  url: string;
  events: string[];
  secret?: string;
  description?: string;
}

// Responses
export interface ApiDeliveryResponse {
  id: string;
  tracking_number: string;
  status: string;
  fare_amount: number;
  created_at: string;
  [key: string]: any;
}
