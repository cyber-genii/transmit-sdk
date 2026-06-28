use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct QuoteLocationInput {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub address: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub lat: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub lng: Option<f64>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PackageDimensions {
    pub length: f64,
    pub width: f64,
    pub height: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct QuotePackageInput {
    pub weight_kg: f64,
    pub dimensions_cm: PackageDimensions,
    #[serde(default = "default_quantity")]
    pub quantity: u32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GetQuoteRequest {
    pub pickup: QuoteLocationInput,
    pub dropoff: QuoteLocationInput,
    pub delivery_type: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub vehicle_type: Option<String>,
    pub packages: Vec<QuotePackageInput>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub scheduled_pickup_time: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OrderContactLocation {
    pub contact_name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub contact_email: Option<String>,
    pub contact_phone: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub contact_phone_secondary: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SupplierInfo {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub reference: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OrderPackageMetaInput {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_id: Option<String>,
    pub description: String,
    #[serde(default)]
    pub value: f64,
    #[serde(default)]
    pub fragile: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub supplier_info: Option<SupplierInfo>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CreateDeliveryOrderRequest {
    pub quote_id: String,
    pub pickup: OrderContactLocation,
    pub dropoff: OrderContactLocation,
    pub packages: Vec<OrderPackageMetaInput>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub payment_method: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub webhook_url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub external_reference: Option<String>,
}

fn default_quantity() -> u32 {
    1
}

/// Deprecated alias
pub type CalculateOrderFareRequest = GetQuoteRequest;
/// Deprecated alias
pub type ApiDeliveryRequest = CreateDeliveryOrderRequest;
/// Deprecated alias
pub type FareQuoteRequest = GetQuoteRequest;

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
