export interface DeliveryLocationInput {
  address?: string;
  lat?: number;
  lng?: number;
  contact_name: string;
  contact_email?: string;
  contact_phone: string;
  contact_phone_secondary?: string;
}

export interface PackageDimensions {
  length: number;
  width: number;
  height: number;
}

export interface SupplierInfo {
  name?: string;
  reference?: string;
}

export interface PackageInput {
  package_id?: string;
  description: string;
  quantity?: number;
  weight_kg: number;
  dimensions_cm?: PackageDimensions;
  value?: number;
  fragile?: boolean;
  supplier_info?: SupplierInfo;
}

export interface CreateDeliveryOrderRequest {
  pickup: DeliveryLocationInput;
  dropoff: DeliveryLocationInput;
  vehicle_type: string;
  delivery_type: string;
  packages?: PackageInput[];
  package_weight_kg?: number;
  package_length_cm?: number;
  package_width_cm?: number;
  package_height_cm?: number;
  package_description?: string;
  package_value?: number;
  is_fragile?: boolean;
  payment_method?: string;
  webhook_url?: string;
  external_reference?: string;
}

export interface DeliveryLocationResponse extends DeliveryLocationInput {
  address: string;
  lat: number;
  lng: number;
  address_source: 'provided' | 'resolved';
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

export interface CalculateOrderFareRequest {
  pickup: DeliveryLocationInput;
  dropoff: DeliveryLocationInput;
  delivery_type: string;
  vehicle_type?: string;
  packages?: PackageInput[];
  package_weight_kg?: number;
  package_length_cm?: number;
  package_width_cm?: number;
  package_height_cm?: number;
}

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
