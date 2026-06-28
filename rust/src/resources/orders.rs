use crate::client::{Client, TransmitError};
use crate::types::{CalculateOrderFareRequest, CreateDeliveryOrderRequest};
use serde_json::Value;

pub struct Orders<'a> {
    client: &'a Client,
}

impl<'a> Orders<'a> {
    pub fn new(client: &'a Client) -> Self {
        Self { client }
    }

    pub async fn calculate_fare(&self, req: &CalculateOrderFareRequest) -> Result<Value, TransmitError> {
        self.client.post("/api/v1/delivery-orders/calculate-fare", req).await
    }

    pub async fn create(&self, req: &CreateDeliveryOrderRequest) -> Result<Value, TransmitError> {
        self.client.post("/api/v1/delivery-orders", req).await
    }

    pub async fn list(&self) -> Result<Vec<Value>, TransmitError> {
        self.client.get("/api/v1/delivery-orders").await
    }

    pub async fn retrieve(&self, id: &str) -> Result<Value, TransmitError> {
        let path = format!("/api/v1/delivery-orders/{}", id);
        self.client.get(&path).await
    }

    pub async fn track(&self, id: &str) -> Result<Value, TransmitError> {
        let path = format!("/api/v1/delivery-orders/{}/track", id);
        self.client.get(&path).await
    }

    pub async fn cancel(&self, id: &str) -> Result<Value, TransmitError> {
        let path = format!("/api/v1/delivery-orders/{}/cancel", id);
        self.client.post(&path, &serde_json::json!({})).await
    }
}
