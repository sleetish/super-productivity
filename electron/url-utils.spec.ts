import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { isValidProtocol } from './url-utils';

describe('isValidProtocol', () => {
  it('should allow http:', () => {
    assert.equal(isValidProtocol('http://example.com'), true);
  });

  it('should allow https:', () => {
    assert.equal(isValidProtocol('https://example.com'), true);
  });

  it('should allow mailto:', () => {
    assert.equal(isValidProtocol('mailto:user@example.com'), true);
  });

  it('should reject file:', () => {
    assert.equal(isValidProtocol('file:///etc/passwd'), false);
  });

  it('should reject ftp:', () => {
    assert.equal(isValidProtocol('ftp://example.com'), false);
  });

  it('should reject javascript:', () => {
    assert.equal(isValidProtocol('javascript:alert(1)'), false);
  });

  it('should reject invalid URLs', () => {
    assert.equal(isValidProtocol('not-a-url'), false);
  });

  it('should reject data: URLs', () => {
    assert.equal(isValidProtocol('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D'), false);
  });
});
