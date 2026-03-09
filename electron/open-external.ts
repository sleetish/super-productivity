import { shell } from 'electron';
import { error } from 'electron-log/main';
import { isValidExternalUrl } from './url-validator';

/**
 * Safely opens external URLs by ensuring they use an allowed protocol.
 * Also handles normalization of double slashes in paths, e.g., for Jira on Mac.
 */
export const openExternalUrl = async (url: string): Promise<void> => {
  if (!isValidExternalUrl(url)) {
    error('Attempted to open unsafe external URL: ' + url);
    return;
  }

  try {
    const urlObj = new URL(url);
    // needed for mac; especially for jira urls we might have a host like this www.host.de//
    urlObj.pathname = urlObj.pathname.replace('//', '/');
    const wellFormedUrl = urlObj.toString();

    await shell.openExternal(wellFormedUrl);
  } catch (e) {
    error('Failed to open external URL:', e);
  }
};
