import { expect } from 'chai';
import { signWebhookPayload, verifyWebhookSignature } from '../src/webhook';

describe('webhook signatures', () => {
  const secret = 'whsec_test_secret';
  const payload = JSON.stringify({ event: 'delivery.status_changed', data: { id: '1' } });

  it('verifies a valid signature', () => {
    const sig = signWebhookPayload(payload, secret);
    expect(verifyWebhookSignature(payload, sig, secret)).to.equal(true);
    expect(verifyWebhookSignature(payload, `sha256=${sig}`, secret)).to.equal(true);
  });

  it('rejects tampered payloads', () => {
    const sig = signWebhookPayload(payload, secret);
    expect(verifyWebhookSignature(`${payload}x`, sig, secret)).to.equal(false);
  });

  it('rejects wrong secrets', () => {
    const sig = signWebhookPayload(payload, secret);
    expect(verifyWebhookSignature(payload, sig, 'wrong')).to.equal(false);
  });
});
