import { shell } from 'electron';
import { error } from 'electron-log/main';
import { isValidExternalUrl } from './external-url-validation';

export const openExternal = async (url: string): Promise<void> => {
  if (isValidExternalUrl(url)) {
    await shell.openExternal(url);
  } else {
    error('Blocked opening external URL due to security policy:', url);
  }
};
