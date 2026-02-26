
import { test } from 'node:test';
import * as assert from 'node:assert';
import { isValidExternalUrl } from './url-validator';

test('isValidExternalUrl', async (t) => {
  await t.test('should return true for valid http URLs', () => {
    assert.strictEqual(isValidExternalUrl('http://example.com'), true);
  });

  await t.test('should return true for valid https URLs', () => {
    assert.strictEqual(isValidExternalUrl('https://example.com'), true);
  });

  await t.test('should return true for valid mailto URLs', () => {
    assert.strictEqual(isValidExternalUrl('mailto:user@example.com'), true);
  });

  await t.test('should return false for file URLs', () => {
    assert.strictEqual(isValidExternalUrl('file:///etc/passwd'), false);
  });

  await t.test('should return false for javascript URLs', () => {
    assert.strictEqual(isValidExternalUrl('javascript:alert(1)'), false);
  });

  await t.test('should return false for invalid URLs', () => {
    assert.strictEqual(isValidExternalUrl('not-a-url'), false);
  });

  await t.test('should return false for empty strings', () => {
    assert.strictEqual(isValidExternalUrl(''), false);
  });
});
