# Respatch SDKs

Official client libraries for the [Respatch](https://respatch.com) logistics API.

## Languages

| SDK | Path | Install |
|-----|------|---------|
| Node.js / TypeScript | `node/` | `npm install @transmit/node-sdk` (local; `@respatch/node-sdk` alias planned) |
| Python | `python/` | `pip install -e python/` |
| Go | `go/` | `go get github.com/transmit/transmit-go-sdk` |
| Rust | `rust/` | `cargo add transmit-rust-sdk --path rust/` |

## Authentication

- **Integration calls** (delivery orders): `Authorization: Bearer <api_key>` (`rsp_*` keys from the developer dashboard).
- **Developer portal calls** (manage keys/webhooks/sandbox): JWT session from `/auth/login`.

Set `RESPATCH_API_KEY` in your environment (legacy `TRANSMIT_API_KEY` also supported in Node/Python).

## API response envelope

The backend wraps payloads as:

```json
{ "success": true, "message": "...", "data": <payload> }
```

All SDK HTTP clients unwrap `.data` automatically.

## Quick start (Node)

```typescript
import { Respatch } from '@transmit/node-sdk';

const respatch = new Respatch({ apiKey: process.env.RESPATCH_API_KEY! });

const order = await respatch.orders.create({
  pickup: {
    lat: 6.5244,
    lng: 3.3792,
    contact_name: 'Jane Sender',
    contact_phone: '+2348012345678',
  },
  dropoff: {
    address: '12 Admiralty Way, Lekki Phase 1, Lagos',
    contact_name: 'John Receiver',
    contact_phone: '+2348098765432',
  },
  vehicle_type: 'motorcycle',
  delivery_type: 'express',
  packages: [
    {
      description: 'Documents',
      quantity: 1,
      weight_kg: 2,
      dimensions_cm: { length: 30, width: 20, height: 5 },
    },
  ],
});

console.log(order.warnings, order.pickup.address_source, order.fare.breakdown);
```

## Base URLs

| Environment | URL |
|-------------|-----|
| Production | `https://api.respatch.com` |
| Sandbox | `https://sandbox-api.respatch.com` |

Override with `baseUrl` / `base_url` in client options. The live docs explorer may use a staging host via `NEXT_PUBLIC_API_URL`.

## Canonical endpoints

Use **Delivery Orders** (`/api/v1/delivery-orders`). Legacy `/api/v1/api-deliveries` routes remain as aliases and return a `Deprecation` header.

## Webhook verification

Verify `X-Respatch-Signature` (HMAC-SHA256 hex of the raw body). Legacy `X-Transmit-Signature` is accepted by SDK helpers.

Webhook payloads for delivery status events include `package_id` for per-package tracking. **Partial fulfillment is supported** — one package may reach `exception` while others are `delivered`; rollup `order.status` becomes `partially_delivered`.

**Node**
```typescript
import { verifyWebhookSignature, getWebhookSignatureHeader } from '@transmit/node-sdk';
```

**Python**
```python
from transmit import verify_webhook_signature, get_webhook_signature_header
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
