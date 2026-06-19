use crate::client::{Client, TransmitError};
use serde_json::Value;

pub struct Sandbox<'a> {
    client: &'a Client,
}

impl<'a> Sandbox<'a> {
    pub fn new(client: &'a Client) -> Self {
        Self { client }
    }

    pub async fn create_data(&self, body: &Value) -> Result<Value, TransmitError> {
        self.client.post("/api/v1/developers/sandbox", body).await
    }

    pub async fn list_data(&self) -> Result<Vec<Value>, TransmitError> {
        self.client.get("/api/v1/developers/sandbox").await
    }

    pub async fn clear_data(&self) -> Result<Value, TransmitError> {
        self.client.delete("/api/v1/developers/sandbox").await
    }
}
