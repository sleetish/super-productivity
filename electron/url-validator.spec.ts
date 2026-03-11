import test from 'node:test';
import assert from 'node:assert';
import { isValidExternalUrl } from './url-validator';

test('isValidExternalUrl', () => {
  assert.strictEqual(isValidExternalUrl('https://example.com'), true);
  assert.strictEqual(isValidExternalUrl('http://example.com'), true);
  assert.strictEqual(isValidExternalUrl('mailto:test@example.com'), true);
  assert.strictEqual(isValidExternalUrl('file:///etc/passwd'), false);
  assert.strictEqual(isValidExternalUrl('javascript:alert(1)'), false);
  assert.strictEqual(isValidExternalUrl('invalid-url'), false);
});
