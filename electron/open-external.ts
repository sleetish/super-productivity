import { shell } from 'electron';
import { log, error } from 'electron-log/main';
import { isValidExternalUrl } from './url-validator';

export const openExternalUrl = async (url: string): Promise<void> => {
  if (isValidExternalUrl(url)) {
    try {
      await shell.openExternal(url);
    } catch (e) {
      error('Failed to open external URL:', e);
    }
  } else {
    log('Blocked opening potentially unsafe external URL:', url);
  }
};
