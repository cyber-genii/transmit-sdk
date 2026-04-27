use crate::client::{Client, TransmitError};
use crate::types::{ApiDeliveryRequest, FareQuoteRequest};
use serde_json::Value;

pub struct Deliveries<'a> {
    client: &'a Client,
}

impl<'a> Deliveries<'a> {
    pub fn new(client: &'a Client) -> Self {
        Self { client }
    }

    pub async fn create(&self, req: &ApiDeliveryRequest) -> Result<Value, TransmitError> {
        self.client.post("/api/v1/api-deliveries", req).await
    }

    pub async fn list(&self) -> Result<Vec<Value>, TransmitError> {
        self.client.get("/api/v1/api-deliveries").await
    }

    pub async fn retrieve(&self, id: &str) -> Result<Value, TransmitError> {
        let path = format!("/api/v1/api-deliveries/{}", id);
        self.client.get(&path).await
    }

    pub async fn quote(&self, req: &FareQuoteRequest) -> Result<Value, TransmitError> {
        self.client.post("/api/v1/api-deliveries/quote", req).await
    }
}
