import { shell } from 'electron';
import { error } from 'electron-log/main';
import { isValidExternalUrl } from './url-validator';

export const openExternalUrl = async (url: string): Promise<void> => {
  if (isValidExternalUrl(url)) {
    try {
      await shell.openExternal(url);
    } catch (err) {
      error(`Failed to open external url: ${url}`, err);
    }
  } else {
    error(`Attempted to open invalid external url: ${url}`);
  }
};
