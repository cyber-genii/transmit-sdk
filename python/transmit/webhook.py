"""Webhook signature verification for inbound Respatch events."""

from __future__ import annotations

import hashlib
import hmac

RESPATCH_SIGNATURE_HEADER = "X-Respatch-Signature"


def verify_webhook_signature(payload: str | bytes, signature_header: str, secret: str) -> bool:
    """Verify ``X-Respatch-Signature`` (or legacy ``X-Transmit-Signature``)."""
    if not signature_header or not secret:
        return False

    body = payload.encode("utf-8") if isinstance(payload, str) else payload
    provided = signature_header.removeprefix("sha256=").strip()
    expected = hmac.new(secret.encode("utf-8"), body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, provided)


def get_webhook_signature_header(headers: dict) -> str:
    for key in (RESPATCH_SIGNATURE_HEADER, "X-Transmit-Signature"):
        val = headers.get(key) or headers.get(key.lower())
        if isinstance(val, str) and val:
            return val
    return ""


def sign_webhook_payload(payload: str | bytes, secret: str) -> str:
    body = payload.encode("utf-8") if isinstance(payload, str) else payload
    return hmac.new(secret.encode("utf-8"), body, hashlib.sha256).hexdigest()
