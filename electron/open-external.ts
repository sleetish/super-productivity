import { shell } from 'electron';
import { log } from 'electron-log/main';
import { isValidExternalUrl } from './url-validator';

export const openExternalUrl = async (url: string): Promise<void> => {
  if (!isValidExternalUrl(url)) {
    log(`Blocked attempt to open URL with disallowed protocol: ${url}`);
    return;
  }

  try {
    // needed for mac; especially for jira urls we might have a host like this www.host.de//
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname.replace(/\/\/+/g, '/');
    const wellFormedUrl = urlObj.toString();
    await shell.openExternal(wellFormedUrl);
  } catch (e) {
    log('Failed to open external URL', e);
  }
};
