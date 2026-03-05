import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { isValidExternalUrl } from './url-validator';

describe('isValidExternalUrl', () => {
  it('should return true for valid http urls', () => {
    assert.strictEqual(isValidExternalUrl('http://example.com'), true);
  });

  it('should return true for valid https urls', () => {
    assert.strictEqual(isValidExternalUrl('https://example.com'), true);
  });

  it('should return true for valid mailto urls', () => {
    assert.strictEqual(isValidExternalUrl('mailto:test@example.com'), true);
  });

  it('should return false for javascript urls', () => {
    assert.strictEqual(isValidExternalUrl('javascript:alert(1)'), false);
  });

  it('should return false for file urls', () => {
    assert.strictEqual(isValidExternalUrl('file:///etc/passwd'), false);
  });

  it('should return false for relative urls', () => {
    assert.strictEqual(isValidExternalUrl('/index.html'), false);
  });

  it('should return false for invalid urls', () => {
    assert.strictEqual(isValidExternalUrl('not-a-url'), false);
  });

  it('should return false for data urls', () => {
    assert.strictEqual(
      isValidExternalUrl('data:text/html,<script>alert(1)</script>'),
      false,
    );
  });

  it('should return false for ftp urls', () => {
    assert.strictEqual(isValidExternalUrl('ftp://example.com/file'), false);
  });
});
