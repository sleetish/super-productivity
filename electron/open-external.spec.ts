import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { openExternalUrl } from './open-external-util';

describe('openExternalUrl', () => {
  it('should open valid http urls', async () => {
    const openExternal = mock.fn(async () => {});
    const logError = mock.fn();
    await openExternalUrl('http://example.com', openExternal, logError);
    assert.strictEqual(openExternal.mock.calls.length, 1);
    assert.strictEqual(openExternal.mock.calls[0].arguments[0], 'http://example.com/');
    assert.strictEqual(logError.mock.calls.length, 0);
  });

  it('should open valid https urls', async () => {
    const openExternal = mock.fn(async () => {});
    const logError = mock.fn();
    await openExternalUrl('https://example.com', openExternal, logError);
    assert.strictEqual(openExternal.mock.calls.length, 1);
    assert.strictEqual(openExternal.mock.calls[0].arguments[0], 'https://example.com/');
    assert.strictEqual(logError.mock.calls.length, 0);
  });

  it('should open valid mailto urls', async () => {
    const openExternal = mock.fn(async () => {});
    const logError = mock.fn();
    await openExternalUrl('mailto:test@example.com', openExternal, logError);
    assert.strictEqual(openExternal.mock.calls.length, 1);
    assert.strictEqual(
      openExternal.mock.calls[0].arguments[0],
      'mailto:test@example.com',
    );
    assert.strictEqual(logError.mock.calls.length, 0);
  });

  it('should block javascript urls', async () => {
    const openExternal = mock.fn(async () => {});
    const logError = mock.fn();
    await openExternalUrl('javascript:alert(1)', openExternal, logError);
    assert.strictEqual(openExternal.mock.calls.length, 0);
    assert.strictEqual(logError.mock.calls.length, 1);
    assert.match(logError.mock.calls[0].arguments[0], /Blocked/);
  });

  it('should block file urls', async () => {
    const openExternal = mock.fn(async () => {});
    const logError = mock.fn();
    await openExternalUrl('file:///etc/passwd', openExternal, logError);
    assert.strictEqual(openExternal.mock.calls.length, 0);
    assert.strictEqual(logError.mock.calls.length, 1);
    assert.match(logError.mock.calls[0].arguments[0], /Blocked/);
  });

  it('should fix double slash in path (Jira fix)', async () => {
    const openExternal = mock.fn(async () => {});
    const logError = mock.fn();
    await openExternalUrl(
      'https://jira.host.de//browse/ISSUE-123',
      openExternal,
      logError,
    );
    assert.strictEqual(openExternal.mock.calls.length, 1);
    // Note: URL implementation might normalize path but we check if our replace logic works.
    // 'https://jira.host.de//browse/ISSUE-123' -> pathname '//browse/ISSUE-123'
    // replace('//', '/') -> '/browse/ISSUE-123'
    // Result: 'https://jira.host.de/browse/ISSUE-123'
    assert.strictEqual(
      openExternal.mock.calls[0].arguments[0],
      'https://jira.host.de/browse/ISSUE-123',
    );
    assert.strictEqual(logError.mock.calls.length, 0);
  });

  it('should handle invalid urls gracefully', async () => {
    const openExternal = mock.fn(async () => {});
    const logError = mock.fn();
    await openExternalUrl('not-a-url', openExternal, logError);
    assert.strictEqual(openExternal.mock.calls.length, 0);
    assert.strictEqual(logError.mock.calls.length, 1);
    assert.match(logError.mock.calls[0].arguments[0], /Failed/);
  });
});
