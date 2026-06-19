use serde::de::DeserializeOwned;
use serde_json::Value;

#[derive(Debug, serde::Deserialize)]
pub struct ApiEnvelope<T> {
    pub success: bool,
    pub message: Option<String>,
    pub data: Option<T>,
}

pub fn unwrap_value(raw: Value) -> Value {
    if let Some(data) = raw.get("data") {
        if raw.get("success").and_then(|v| v.as_bool()).unwrap_or(false) || data.is_object() || data.is_array() {
            return data.clone();
        }
    }
    raw
}

pub fn decode_data<T: DeserializeOwned>(raw: Value) -> Result<T, serde_json::Error> {
    let inner = unwrap_value(raw);
    serde_json::from_value(inner)
}
