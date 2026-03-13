import { test } from 'node:test';
import * as assert from 'node:assert';
import { isValidExternalUrl } from './url-validator';

test('isValidExternalUrl - allows valid protocols', () => {
  assert.strictEqual(isValidExternalUrl('http://example.com'), true);
  assert.strictEqual(isValidExternalUrl('https://example.com'), true);
  assert.strictEqual(isValidExternalUrl('mailto:user@example.com'), true);
});

test('isValidExternalUrl - rejects dangerous protocols', () => {
  assert.strictEqual(isValidExternalUrl('file:///etc/passwd'), false);
  assert.strictEqual(isValidExternalUrl('javascript:alert(1)'), false);
  assert.strictEqual(isValidExternalUrl('data:text/html,<html></html>'), false);
  assert.strictEqual(isValidExternalUrl('smb://server/share'), false);
});

test('isValidExternalUrl - rejects invalid URLs', () => {
  assert.strictEqual(isValidExternalUrl('not-a-url'), false);
  assert.strictEqual(isValidExternalUrl(''), false);
});
