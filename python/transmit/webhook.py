"""Webhook signature verification for inbound Transmit events."""

from __future__ import annotations

import hashlib
import hmac


def verify_webhook_signature(payload: str | bytes, signature_header: str, secret: str) -> bool:
    """Verify ``X-Transmit-Signature`` (HMAC-SHA256 hex of raw body)."""
    if not signature_header or not secret:
        return False

    body = payload.encode("utf-8") if isinstance(payload, str) else payload
    provided = signature_header.removeprefix("sha256=").strip()
    expected = hmac.new(secret.encode("utf-8"), body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, provided)


def sign_webhook_payload(payload: str | bytes, secret: str) -> str:
    body = payload.encode("utf-8") if isinstance(payload, str) else payload
    return hmac.new(secret.encode("utf-8"), body, hashlib.sha256).hexdigest()
