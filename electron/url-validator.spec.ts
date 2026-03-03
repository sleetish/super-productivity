import test from 'node:test';
import assert from 'node:assert';
import { isValidExternalUrl } from './url-validator';

test('valid protocols', () => {
  assert.strictEqual(isValidExternalUrl('http://example.com'), true);
  assert.strictEqual(isValidExternalUrl('https://example.com'), true);
  assert.strictEqual(isValidExternalUrl('mailto:user@example.com'), true);
});

test('invalid protocols', () => {
  assert.strictEqual(isValidExternalUrl('file:///etc/passwd'), false);
  assert.strictEqual(isValidExternalUrl('javascript:alert(1)'), false);
  assert.strictEqual(isValidExternalUrl('data:text/html,<html>'), false);
  assert.strictEqual(isValidExternalUrl('chrome://settings'), false);
});

test('invalid urls', () => {
  assert.strictEqual(isValidExternalUrl('not a url'), false);
  assert.strictEqual(isValidExternalUrl(''), false);
});
