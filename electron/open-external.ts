import { shell } from 'electron';
import { error } from 'electron-log/main';
import { isValidProtocol } from './url-utils';

export const openExternal = (url: string): Promise<void> => {
  if (isValidProtocol(url)) {
    return shell.openExternal(url);
  } else {
    error('Blocked opening external URL with disallowed protocol:', url);
    return Promise.resolve();
  }
};
