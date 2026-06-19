# Transmit SDKs

Official client libraries for the [Transmit](https://transmit.network) logistics API.

## Languages

| SDK | Path | Install |
|-----|------|---------|
| Node.js / TypeScript | `node/` | `npm install @transmit/node-sdk` (local) |
| Python | `python/` | `pip install -e python/` |
| Go | `go/` | `go get github.com/transmit/transmit-go-sdk` |
| Rust | `rust/` | `cargo add transmit-rust-sdk --path rust/` |

## Authentication

- **Integration calls** (API deliveries): `Authorization: Bearer <api_key>` (`txm_*` keys from the developer portal).
- **Developer portal calls** (manage keys/webhooks/sandbox): JWT session from `/auth/login`.

Use the same client class with the appropriate credential for your use case.

## API response envelope

The Rust backend wraps payloads as:

```json
{ "success": true, "message": "...", "data": <payload> }
```

Paginated lists use `data: [items, total]`. All SDK HTTP clients unwrap `.data` automatically.

## Quick start (Node)

```typescript
import { Transmit } from '@transmit/node-sdk';

const transmit = new Transmit({ apiKey: process.env.TRANSMIT_API_KEY! });

const quote = await transmit.deliveries.quote({
  pickup_latitude: 6.5244,
  pickup_longitude: 3.3792,
  dropoff_latitude: 6.4550,
  dropoff_longitude: 3.3941,
  package_weight_kg: 2,
  delivery_type: 'express',
});
```

## Environment

| Variable | Default |
|----------|---------|
| Production | `https://api.transmit.com` |
| Sandbox | `https://sandbox-api.transmit.com` |

Override with `baseUrl` / `base_url` in client options.

## Webhook verification

All SDKs verify `X-Transmit-Signature` (HMAC-SHA256 hex of the raw body).

**Node**
```typescript
import { verifyWebhookSignature } from '@transmit/node-sdk';
```

**Python**
```python
from transmit import verify_webhook_signature
```

**Go**
```go
import "github.com/transmit/transmit-go-sdk/transmit"
ok := transmit.VerifyWebhookSignature(body, sigHeader, secret)
```

**Rust**
```rust
use transmit_rust_sdk::verify_webhook_signature;
```

## Status

Phase 4: envelope unwrapping, schema alignment, webhook HMAC helpers (all languages), and SDK CI workflow are implemented. API-key middleware for `/api/v1/api-deliveries/*` is enabled on the backend.
