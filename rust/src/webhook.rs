use hmac::{Hmac, Mac};
use sha2::Sha256;

type HmacSha256 = Hmac<Sha256>;

/// Verify `X-Transmit-Signature` (HMAC-SHA256 hex of raw body).
pub fn verify_webhook_signature(payload: &[u8], signature_header: &str, secret: &str) -> bool {
    if signature_header.is_empty() || secret.is_empty() {
        return false;
    }

    let provided = signature_header
        .trim()
        .strip_prefix("sha256=")
        .unwrap_or(signature_header.trim());

    let mut mac = match HmacSha256::new_from_slice(secret.as_bytes()) {
        Ok(m) => m,
        Err(_) => return false,
    };
    mac.update(payload);

    let expected = hex::encode(mac.finalize().into_bytes());
    constant_time_eq(expected.as_bytes(), provided.as_bytes())
}

/// Sign a payload for tests or replay tools.
pub fn sign_webhook_payload(payload: &[u8], secret: &str) -> String {
    let mut mac = HmacSha256::new_from_slice(secret.as_bytes()).expect("hmac key");
    mac.update(payload);
    hex::encode(mac.finalize().into_bytes())
}

fn constant_time_eq(a: &[u8], b: &[u8]) -> bool {
    if a.len() != b.len() {
        return false;
    }
    a.iter()
        .zip(b.iter())
        .fold(0u8, |acc, (x, y)| acc | (x ^ y))
        == 0
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn round_trip_signature() {
        let secret = "whsec_test";
        let body = br#"{"event":"delivery.status_changed"}"#;
        let sig = sign_webhook_payload(body, secret);
        assert!(verify_webhook_signature(body, &sig, secret));
        assert!(verify_webhook_signature(body, &format!("sha256={sig}"), secret));
    }
}
