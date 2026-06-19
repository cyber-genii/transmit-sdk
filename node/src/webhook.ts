import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Verify an inbound Transmit webhook using `X-Transmit-Signature`.
 * Signature is HMAC-SHA256 of the raw request body, hex-encoded.
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signatureHeader: string,
  secret: string,
): boolean {
  if (!signatureHeader || !secret) return false;

  const body = typeof payload === 'string' ? payload : payload.toString('utf8');
  const expected = createHmac('sha256', secret).update(body, 'utf8').digest('hex');
  const provided = signatureHeader.replace(/^sha256=/i, '').trim();

  try {
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(provided, 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Sign an outbound webhook payload (for tests or replay tools).
 */
export function signWebhookPayload(payload: string | Buffer, secret: string): string {
  const body = typeof payload === 'string' ? payload : payload.toString('utf8');
  return createHmac('sha256', secret).update(body, 'utf8').digest('hex');
}
