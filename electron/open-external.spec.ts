import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { createOpenExternal } from './open-external';

describe('openExternal', () => {
  let openExternal: (url: string) => Promise<void>;
  let shellMock: any;
  let loggerMock: any;
  let loggedErrors: any[];
  let openedUrls: string[];

  beforeEach(() => {
    loggedErrors = [];
    openedUrls = [];

    shellMock = {
      openExternal: async (url: string) => {
        openedUrls.push(url);
      },
    };

    loggerMock = (...args: any[]) => {
      loggedErrors.push(args);
    };

    openExternal = createOpenExternal(shellMock, loggerMock);
  });

  it('should open valid http URL', async () => {
    await openExternal('http://example.com');
    assert.strictEqual(openedUrls.length, 1);
    assert.strictEqual(openedUrls[0], 'http://example.com/');
    assert.strictEqual(loggedErrors.length, 0);
  });

  it('should open valid https URL', async () => {
    await openExternal('https://example.com');
    assert.strictEqual(openedUrls.length, 1);
    assert.strictEqual(openedUrls[0], 'https://example.com/');
    assert.strictEqual(loggedErrors.length, 0);
  });

  it('should open valid mailto URL', async () => {
    await openExternal('mailto:test@example.com');
    assert.strictEqual(openedUrls.length, 1);
    assert.strictEqual(openedUrls[0], 'mailto:test@example.com');
    assert.strictEqual(loggedErrors.length, 0);
  });

  it('should block file:// protocol', async () => {
    await openExternal('file:///etc/passwd');
    assert.strictEqual(openedUrls.length, 0);
    assert.strictEqual(loggedErrors.length, 1);
    assert.match(loggedErrors[0][0], /Blocked attempt/);
  });

  it('should block javascript: protocol', async () => {
    await openExternal('javascript:alert(1)');
    assert.strictEqual(openedUrls.length, 0);
    assert.strictEqual(loggedErrors.length, 1);
    assert.match(loggedErrors[0][0], /Blocked attempt/);
  });

  it('should fix double slashes in path (Jira fix)', async () => {
    await openExternal('https://jira.example.com//browse/PROJ-123');
    assert.strictEqual(openedUrls.length, 1);
    assert.strictEqual(openedUrls[0], 'https://jira.example.com/browse/PROJ-123');
  });

  it('should log error if URL parsing fails', async () => {
    await openExternal('not-a-url');
    assert.strictEqual(openedUrls.length, 0);
    assert.strictEqual(loggedErrors.length, 1);
    assert.match(loggedErrors[0][0], /Failed to open/);
  });
});
