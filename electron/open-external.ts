import { shell } from 'electron';
import { error, log } from 'electron-log/main';
import { isValidExternalUrl } from './url-validator';

export const openExternalUrl = async (url: string): Promise<void> => {
  if (!isValidExternalUrl(url)) {
    error(`Blocked opening untrusted external URL: ${url}`);
    return;
  }

  try {
    // needed for mac; especially for jira urls we might have a host like this www.host.de//
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname.replace('//', '/');
    const wellFormedUrl = urlObj.toString();

    log(`Opening external URL: ${wellFormedUrl}`);
    await shell.openExternal(wellFormedUrl);
  } catch (e) {
    error(`Failed to open external URL: ${url}`, e);
  }
};
