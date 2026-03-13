import { shell } from 'electron';
import { isValidExternalUrl } from './url-validator';
import { error, warn } from 'electron-log/main';

export const openExternalUrl = async (url: string): Promise<void> => {
  try {
    // needed for mac; especially for jira urls we might have a host like this www.host.de//
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname.replace('//', '/');
    const wellFormedUrl = urlObj.toString();

    if (!isValidExternalUrl(wellFormedUrl)) {
      warn(
        `[Security] Blocked attempt to open external URL with invalid protocol: ${wellFormedUrl}`,
      );
      return;
    }

    await shell.openExternal(wellFormedUrl);
  } catch (e) {
    error(`Failed to open external URL: ${url}`, e);
  }
};
