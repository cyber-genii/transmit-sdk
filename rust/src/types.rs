use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DeliveryLocationInput {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub address: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub lat: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub lng: Option<f64>,
    pub contact_name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub contact_email: Option<String>,
    pub contact_phone: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub contact_phone_secondary: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PackageDimensions {
    pub length: f64,
    pub width: f64,
    pub height: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SupplierInfo {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub reference: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PackageInput {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_id: Option<String>,
    pub description: String,
    #[serde(default = "default_quantity")]
    pub quantity: u32,
    pub weight_kg: f64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub dimensions_cm: Option<PackageDimensions>,
    #[serde(default)]
    pub value: f64,
    #[serde(default)]
    pub fragile: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub supplier_info: Option<SupplierInfo>,
}

fn default_quantity() -> u32 {
    1
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CreateDeliveryOrderRequest {
    pub pickup: DeliveryLocationInput,
    pub dropoff: DeliveryLocationInput,
    pub vehicle_type: String,
    pub delivery_type: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub packages: Option<Vec<PackageInput>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_weight_kg: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_length_cm: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_width_cm: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_height_cm: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_value: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub is_fragile: Option<bool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub payment_method: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub webhook_url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub external_reference: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CalculateOrderFareRequest {
    pub pickup: DeliveryLocationInput,
    pub dropoff: DeliveryLocationInput,
    pub delivery_type: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub vehicle_type: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub packages: Option<Vec<PackageInput>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_weight_kg: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_length_cm: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_width_cm: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_height_cm: Option<f64>,
}

/// Deprecated alias
pub type ApiDeliveryRequest = CreateDeliveryOrderRequest;
/// Deprecated alias
pub type FareQuoteRequest = CalculateOrderFareRequest;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateWebhookRequest {
    pub url: String,
    pub events: Vec<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub secret: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiKeyCreateRequest {
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub expires_in_days: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub permissions: Option<Vec<String>>,
}
