use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiDeliveryRequest {
    pub sender_name: String,
    pub sender_phone: String,
    pub receiver_name: String,
    pub receiver_phone: String,
    pub pickup_latitude: f64,
    pub pickup_longitude: f64,
    pub pickup_address: String,
    pub dropoff_latitude: f64,
    pub dropoff_longitude: f64,
    pub dropoff_address: String,
    pub package_weight_kg: f64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_length_cm: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_width_cm: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub package_height_cm: Option<f64>,
    pub package_description: String,
    pub delivery_type: String,
    pub vehicle_type: String,
    pub payment_method: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FareQuoteRequest {
    pub pickup_address: String,
    pub dropoff_address: String,
    pub vehicle_type: String,
    pub package_weight: f64,
}

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
