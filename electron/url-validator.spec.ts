import test from 'node:test';
import assert from 'node:assert';
import { isAllowedUrl } from './url-validator';

test('isAllowedUrl', async (t) => {
  await t.test('allows http urls', () => {
    assert.strictEqual(isAllowedUrl('http://example.com'), true);
  });

  await t.test('allows https urls', () => {
    assert.strictEqual(isAllowedUrl('https://example.com'), true);
  });

  await t.test('allows mailto urls', () => {
    assert.strictEqual(isAllowedUrl('mailto:test@example.com'), true);
  });

  await t.test('blocks file urls', () => {
    assert.strictEqual(isAllowedUrl('file:///etc/passwd'), false);
  });

  await t.test('blocks ftp urls', () => {
    assert.strictEqual(isAllowedUrl('ftp://example.com'), false);
  });

  await t.test('blocks javascript urls', () => {
    assert.strictEqual(isAllowedUrl('javascript:alert(1)'), false);
  });

  await t.test('blocks data urls', () => {
    assert.strictEqual(isAllowedUrl('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=='), false);
  });

  await t.test('blocks invalid urls', () => {
    assert.strictEqual(isAllowedUrl('not-a-url'), false);
  });
});
