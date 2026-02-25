import { describe, it } from 'node:test';
import assert from 'node:assert';
import { normalizeUrl, isValidProtocol } from './url-validator';

describe('url-validator', () => {
  describe('normalizeUrl', () => {
    it('should normalize Jira double-slash issue at root', () => {
      const url = 'https://www.host.de//foo/bar';
      const normalized = normalizeUrl(url);
      assert.strictEqual(normalized, 'https://www.host.de/foo/bar');
    });

    it('should normalize double-slash inside path', () => {
      const url = 'https://www.host.de/foo//bar';
      const normalized = normalizeUrl(url);
      assert.strictEqual(normalized, 'https://www.host.de/foo/bar');
    });

    it('should handle normal URLs correctly', () => {
      const url = 'https://www.host.de/foo/bar';
      const normalized = normalizeUrl(url);
      assert.strictEqual(normalized, 'https://www.host.de/foo/bar');
    });

    it('should return original URL if parsing fails', () => {
      const url = 'not a valid url';
      const normalized = normalizeUrl(url);
      assert.strictEqual(normalized, url);
    });
  });

  describe('isValidProtocol', () => {
    it('should allow http', () => {
      assert.strictEqual(isValidProtocol('http://example.com'), true);
    });

    it('should allow https', () => {
      assert.strictEqual(isValidProtocol('https://example.com'), true);
    });

    it('should allow mailto', () => {
      assert.strictEqual(isValidProtocol('mailto:user@example.com'), true);
    });

    it('should block file protocol', () => {
      assert.strictEqual(isValidProtocol('file:///etc/passwd'), false);
    });

    it('should block javascript protocol', () => {
      assert.strictEqual(isValidProtocol('javascript:alert(1)'), false);
    });

    it('should block ftp protocol', () => {
      assert.strictEqual(isValidProtocol('ftp://example.com'), false);
    });

    it('should block invalid URLs', () => {
      assert.strictEqual(isValidProtocol('not a valid url'), false);
    });
  });
});
