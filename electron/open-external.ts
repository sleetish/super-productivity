import { Shell } from 'electron';

let _shell: Shell | undefined;
let _logError: ((...params: any[]) => void) | undefined;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  _shell = require('electron').shell;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  _logError = require('electron-log/main').error;
} catch (e) {
  console.warn('Electron modules not found. This is expected in unit tests.');
}

export const openExternalUrl = async (
  url: string,
  // dependencies injected for testing
  injectedShell?: Shell,
  injectedLogError?: (...params: any[]) => void,
): Promise<void> => {
  const shell = injectedShell || _shell;
  const logError = injectedLogError || _logError || console.error;

  if (!shell) {
    throw new Error('Electron shell not available');
  }

  let urlObj: URL;
  try {
    urlObj = new URL(url);
  } catch (e) {
    logError('Invalid URL passed to openExternalUrl:', url, e);
    return;
  }

  // Explicitly allow only http, https, and mailto
  if (['https:', 'http:', 'mailto:'].includes(urlObj.protocol)) {
    await shell.openExternal(url);
  } else {
    const msg = 'Blocked opening external URL with disallowed protocol: ' + url;
    logError(msg);
    throw new Error(msg);
  }
};
