import { test } from 'node:test';
import assert from 'node:assert';
import { isValidProtocol } from './url-validation-util';

test('isValidProtocol should return true for http URLs', () => {
  assert.strictEqual(isValidProtocol('http://example.com'), true);
});

test('isValidProtocol should return true for https URLs', () => {
  assert.strictEqual(isValidProtocol('https://example.com'), true);
});

test('isValidProtocol should return true for mailto URLs', () => {
  assert.strictEqual(isValidProtocol('mailto:user@example.com'), true);
});

test('isValidProtocol should return false for file URLs', () => {
  assert.strictEqual(isValidProtocol('file:///etc/passwd'), false);
});

test('isValidProtocol should return false for javascript URLs', () => {
  assert.strictEqual(isValidProtocol('javascript:alert(1)'), false);
});

test('isValidProtocol should return false for invalid URLs', () => {
  assert.strictEqual(isValidProtocol('not-a-url'), false);
});
