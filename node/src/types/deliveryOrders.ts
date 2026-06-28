export interface QuoteLocationInput {
  address?: string;
  lat?: number;
  lng?: number;
}

export interface PackageDimensions {
  length: number;
  width: number;
  height: number;
}

export interface QuotePackageInput {
  weight_kg: number;
  dimensions_cm: PackageDimensions;
  quantity?: number;
}

export interface GetQuoteRequest {
  pickup: QuoteLocationInput;
  dropoff: QuoteLocationInput;
  delivery_type: string;
  vehicle_type?: string;
  packages: QuotePackageInput[];
  scheduled_pickup_time?: string;
}

export interface QuoteLocationResponse {
  address: string;
  address_source: 'provided' | 'resolved';
  lat: number;
  lng: number;
}

export interface QuoteFareBreakdown {
  base_fee: number;
  distance_fee: number;
  weight_surcharge: number;
}

export interface QuoteFareAmount {
  currency: string;
  amount: number;
  breakdown: QuoteFareBreakdown;
}

export interface VehicleQuoteOption {
  vehicle_type: string;
  fare: QuoteFareAmount;
}

export interface GetQuoteResponse {
  quote_id: string;
  expires_at: string;
  pickup: QuoteLocationResponse;
  dropoff: QuoteLocationResponse;
  distance_km: number;
  estimated_duration_minutes: number;
  recommended_vehicle_type: string;
  options: VehicleQuoteOption[];
  warnings: OrderWarning[];
}

export interface OrderContactLocation {
  contact_name: string;
  contact_email?: string;
  contact_phone: string;
  contact_phone_secondary?: string;
}

export interface SupplierInfo {
  name?: string;
  reference?: string;
}

export interface OrderPackageMetaInput {
  package_id?: string;
  description: string;
  value?: number;
  fragile?: boolean;
  supplier_info?: SupplierInfo;
}

export interface CreateDeliveryOrderRequest {
  quote_id: string;
  pickup: OrderContactLocation;
  dropoff: OrderContactLocation;
  packages: OrderPackageMetaInput[];
  payment_method?: string;
  webhook_url?: string;
  external_reference?: string;
}

export interface DeliveryLocationResponse {
  address: string;
  lat: number;
  lng: number;
  address_source: 'provided' | 'resolved';
  contact_name: string;
  contact_email?: string;
  contact_phone: string;
  contact_phone_secondary?: string;
}

export interface OrderWarning {
  field: string;
  message: string;
}

export interface FareBreakdown {
  base_fee: string;
  distance_fee: string;
  weight_surcharge: string;
  total: string;
  currency: string;
}

export interface PackageResponse {
  package_id: string;
  description: string;
  quantity: number;
  weight_kg: number;
  dimensions_cm: PackageDimensions;
  value: number;
  fragile: boolean;
  status: string;
  supplier_info?: SupplierInfo;
}

export interface CreateDeliveryOrderResponse {
  order_id: string;
  status: string;
  created_at: string;
  pickup: DeliveryLocationResponse;
  dropoff: DeliveryLocationResponse;
  packages: PackageResponse[];
  vehicle_type: string;
  delivery_type: string;
  fare: { breakdown: FareBreakdown };
  tracking_url: string;
  warnings: OrderWarning[];
  external_reference?: string;
}

/** @deprecated Use GetQuoteRequest */
export type CalculateOrderFareRequest = GetQuoteRequest;

/** @deprecated Use GetQuoteResponse */
export type CalculateOrderFareResponse = GetQuoteResponse;

export interface PackageTrackStatus {
  package_id: string;
  status: string;
  updated_at: string;
}

export interface DeliveryOrderTrackResponse {
  order_id: string;
  status: string;
  packages: PackageTrackStatus[];
  tracking_url: string;
  warnings: OrderWarning[];
}

export interface BookFromQuoteParams {
  quoteId: string;
  pickup: OrderContactLocation;
  dropoff: OrderContactLocation;
  packages: OrderPackageMetaInput[];
  payment_method?: string;
  webhook_url?: string;
  external_reference?: string;
}
