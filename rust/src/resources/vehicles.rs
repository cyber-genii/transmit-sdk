use crate::client::{Client, TransmitError};
use serde_json::Value;

pub struct Vehicles<'a> {
    client: &'a Client,
}

impl<'a> Vehicles<'a> {
    pub fn new(client: &'a Client) -> Self {
        Self { client }
    }

    pub async fn get_types(&self) -> Result<Value, TransmitError> {
        self.client.get("/api/v1/vehicles/types").await
    }
}
