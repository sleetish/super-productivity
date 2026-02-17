import { describe, it } from 'node:test';
import assert from 'node:assert';
import { isValidProtocol } from './url-validator';

describe('isValidProtocol', () => {
  it('should return true for valid protocols', () => {
    assert.strictEqual(isValidProtocol('https://google.com'), true);
    assert.strictEqual(isValidProtocol('http://example.com'), true);
    assert.strictEqual(isValidProtocol('mailto:user@example.com'), true);
  });

  it('should return false for invalid protocols', () => {
    assert.strictEqual(isValidProtocol('file:///etc/passwd'), false);
    assert.strictEqual(isValidProtocol('ftp://example.com'), false);
    assert.strictEqual(isValidProtocol('javascript:alert(1)'), false);
    assert.strictEqual(isValidProtocol('vbscript:alert(1)'), false);
    assert.strictEqual(
      isValidProtocol('data:text/html,<script>alert(1)</script>'),
      false,
    );
    assert.strictEqual(isValidProtocol('smb://server/share'), false);
    assert.strictEqual(isValidProtocol('custom-scheme://something'), false);
  });

  it('should handle malformed URLs gracefully', () => {
    assert.strictEqual(isValidProtocol('invalid-url'), false);
    assert.strictEqual(isValidProtocol(''), false);
  });
});
