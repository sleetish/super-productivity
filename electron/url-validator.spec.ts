import test from 'node:test';
import assert from 'node:assert';
import { isValidExternalUrl } from './url-validator';

test('isValidExternalUrl - http', () => {
  assert.strictEqual(isValidExternalUrl('http://example.com'), true);
});

test('isValidExternalUrl - https', () => {
  assert.strictEqual(isValidExternalUrl('https://example.com'), true);
});

test('isValidExternalUrl - mailto', () => {
  assert.strictEqual(isValidExternalUrl('mailto:test@example.com'), true);
});

test('isValidExternalUrl - javascript (XSS)', () => {
  assert.strictEqual(isValidExternalUrl('javascript:alert(1)'), false);
});

test('isValidExternalUrl - file', () => {
  assert.strictEqual(isValidExternalUrl('file:///etc/passwd'), false);
});

test('isValidExternalUrl - unknown scheme', () => {
  assert.strictEqual(isValidExternalUrl('not_a_scheme:example.com'), false);
});

test('isValidExternalUrl - invalid url format', () => {
  assert.strictEqual(isValidExternalUrl('not a url'), false);
});

test('isValidExternalUrl - data (XSS)', () => {
  assert.strictEqual(
    isValidExternalUrl('data:text/html,<script>alert(1)</script>'),
    false,
  );
});
