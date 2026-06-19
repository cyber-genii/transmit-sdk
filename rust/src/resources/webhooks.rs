use crate::client::{Client, TransmitError};
use serde_json::Value;

pub struct Webhooks<'a> {
    client: &'a Client,
}

impl<'a> Webhooks<'a> {
    pub fn new(client: &'a Client) -> Self {
        Self { client }
    }

    pub async fn list(&self) -> Result<Vec<Value>, TransmitError> {
        self.client.get("/api/v1/developers/webhooks").await
    }

    pub async fn create(&self, body: &Value) -> Result<Value, TransmitError> {
        self.client.post("/api/v1/developers/webhooks", body).await
    }

    pub async fn retrieve(&self, id: &str) -> Result<Value, TransmitError> {
        self.client.get(&format!("/api/v1/developers/webhooks/{}", id)).await
    }

    pub async fn delete(&self, id: &str) -> Result<Value, TransmitError> {
        self.client.delete(&format!("/api/v1/developers/webhooks/{}", id)).await
    }
}
