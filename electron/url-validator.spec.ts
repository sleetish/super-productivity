import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { isValidExternalUrl } from './url-validator';

describe('isValidExternalUrl', () => {
  it('should allow http URLs', () => {
    assert.strictEqual(isValidExternalUrl('http://example.com'), true);
  });

  it('should allow https URLs', () => {
    assert.strictEqual(isValidExternalUrl('https://example.com'), true);
  });

  it('should allow mailto URLs', () => {
    assert.strictEqual(isValidExternalUrl('mailto:test@example.com'), true);
  });

  it('should block javascript URLs', () => {
    assert.strictEqual(isValidExternalUrl('javascript:alert(1)'), false);
  });

  it('should block file URLs', () => {
    assert.strictEqual(isValidExternalUrl('file:///etc/passwd'), false);
  });

  it('should block data URLs', () => {
    assert.strictEqual(
      isValidExternalUrl('data:text/html,<script>alert(1)</script>'),
      false,
    );
  });

  it('should block empty URLs', () => {
    assert.strictEqual(isValidExternalUrl(''), false);
  });

  it('should block invalid URLs', () => {
    assert.strictEqual(isValidExternalUrl('not a url'), false);
  });
});
