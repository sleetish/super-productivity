import { shell } from 'electron';
import { error } from 'electron-log/main';
import { isAllowedUrl } from './url-validator';

export const openExternalUrl = async (url: string): Promise<void> => {
  if (isAllowedUrl(url)) {
    try {
      await shell.openExternal(url);
    } catch (e) {
      error(`Failed to open URL: ${url}`, e);
    }
  } else {
    error(
      `Security warning: Blocked attempt to open external URL with forbidden protocol: ${url}`,
    );
  }
};
