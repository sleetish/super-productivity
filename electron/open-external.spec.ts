import { openExternalUrl } from './open-external';
import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('openExternalUrl', () => {
  const mockShell = {
    openExternal: async (url: string): Promise<void> => {},
  } as any;

  // No-op logger
  const mockLogError = (...args: any[]): void => {};

  it('should open valid http URL', async (t) => {
    t.mock.method(mockShell, 'openExternal');
    await openExternalUrl('http://example.com', mockShell, mockLogError);
    assert.strictEqual(mockShell.openExternal.mock.calls.length, 1);
    assert.strictEqual(
      mockShell.openExternal.mock.calls[0].arguments[0],
      'http://example.com',
    );
  });

  it('should open valid https URL', async (t) => {
    t.mock.method(mockShell, 'openExternal');
    await openExternalUrl('https://example.com', mockShell, mockLogError);
    assert.strictEqual(mockShell.openExternal.mock.calls.length, 1);
    assert.strictEqual(
      mockShell.openExternal.mock.calls[0].arguments[0],
      'https://example.com',
    );
  });

  it('should open valid mailto URL', async (t) => {
    t.mock.method(mockShell, 'openExternal');
    await openExternalUrl('mailto:test@example.com', mockShell, mockLogError);
    assert.strictEqual(mockShell.openExternal.mock.calls.length, 1);
    assert.strictEqual(
      mockShell.openExternal.mock.calls[0].arguments[0],
      'mailto:test@example.com',
    );
  });

  it('should block file protocol', async (t) => {
    t.mock.method(mockShell, 'openExternal');
    await assert.rejects(
      async () => {
        await openExternalUrl('file:///etc/passwd', mockShell, mockLogError);
      },
      {
        message:
          'Blocked opening external URL with disallowed protocol: file:///etc/passwd',
      },
    );
    assert.strictEqual(mockShell.openExternal.mock.calls.length, 0);
  });

  it('should block javascript protocol', async (t) => {
    t.mock.method(mockShell, 'openExternal');
    await assert.rejects(
      async () => {
        await openExternalUrl('javascript:alert(1)', mockShell, mockLogError);
      },
      {
        message:
          'Blocked opening external URL with disallowed protocol: javascript:alert(1)',
      },
    );
    assert.strictEqual(mockShell.openExternal.mock.calls.length, 0);
  });

  it('should handle invalid URLs gracefully (log error but not throw)', async (t) => {
    const logMock = t.mock.fn();
    // 'not-a-valid-url' might be parsed as relative URL by URL constructor depending on base?
    // Actually URL constructor requires protocol if no base.
    await openExternalUrl('INVALID_URL', mockShell, logMock);
    assert.strictEqual(logMock.mock.calls.length, 1);
    assert.match(logMock.mock.calls[0].arguments[0], /Invalid URL/);
  });
});
