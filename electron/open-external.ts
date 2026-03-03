import { shell } from 'electron';
import { error } from 'electron-log/main';
import { isValidExternalUrl } from './url-validator';

export const openExternalUrl = async (url: string): Promise<void> => {
  if (isValidExternalUrl(url)) {
    await shell.openExternal(url);
  } else {
    error('Attempted to open invalid external URL:', url);
  }
};
