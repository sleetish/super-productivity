import { shell } from 'electron';
import { error } from 'electron-log/main';
import { isValidExternalUrl } from './url-validator';

export const openExternalUrl = async (url: string): Promise<void> => {
  try {
    // needed for mac; especially for jira urls we might have a host like this www.host.de//
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname.replace('//', '/');
    const wellFormedUrl = urlObj.toString();

    if (!isValidExternalUrl(wellFormedUrl)) {
      error(`Blocked attempt to open invalid/unsupported URL: ${wellFormedUrl}`);
      return;
    }

    await shell.openExternal(wellFormedUrl);
  } catch (e) {
    error(`Failed to parse or open external URL: ${url}`, e);
  }
};
