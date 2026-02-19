import { describe, it } from 'node:test';
import assert from 'node:assert';
import { isValidExternalUrl } from './external-url-validation';

describe('isValidExternalUrl', () => {
  it('should allow valid http URLs', () => {
    assert.strictEqual(isValidExternalUrl('http://example.com'), true);
    assert.strictEqual(isValidExternalUrl('http://www.google.com/search?q=foo'), true);
  });

  it('should allow valid https URLs', () => {
    assert.strictEqual(isValidExternalUrl('https://example.com'), true);
    assert.strictEqual(
      isValidExternalUrl('https://secure.site.org/path/to/resource'),
      true,
    );
  });

  it('should allow valid mailto URLs', () => {
    assert.strictEqual(isValidExternalUrl('mailto:user@example.com'), true);
    assert.strictEqual(
      isValidExternalUrl('mailto:support@company.com?subject=Help'),
      true,
    );
  });

  it('should block file URLs', () => {
    assert.strictEqual(isValidExternalUrl('file:///etc/passwd'), false);
    assert.strictEqual(isValidExternalUrl('file://C:/Windows/System32/calc.exe'), false);
  });

  it('should block javascript URLs', () => {
    assert.strictEqual(isValidExternalUrl('javascript:alert(1)'), false);
    assert.strictEqual(isValidExternalUrl('javascript:void(0)'), false);
  });

  it('should block data URLs', () => {
    assert.strictEqual(
      isValidExternalUrl('data:text/html,<script>alert(1)</script>'),
      false,
    );
  });

  it('should block vbscript URLs', () => {
    assert.strictEqual(isValidExternalUrl('vbscript:msgbox("hello")'), false);
  });

  it('should block chrome URLs', () => {
    assert.strictEqual(isValidExternalUrl('chrome://settings'), false);
  });

  it('should handle invalid URLs gracefully', () => {
    assert.strictEqual(isValidExternalUrl('not-a-url'), false);
    assert.strictEqual(isValidExternalUrl(''), false);
    assert.strictEqual(isValidExternalUrl('http'), false); // Missing ://
    assert.strictEqual(isValidExternalUrl('://no-scheme'), false);
  });

  it('should be case insensitive regarding protocol', () => {
    // URL parser normalizes protocol to lowercase
    assert.strictEqual(isValidExternalUrl('HTTPS://EXAMPLE.COM'), true);
    assert.strictEqual(isValidExternalUrl('MaiLTo:user@example.com'), true);
  });
});
