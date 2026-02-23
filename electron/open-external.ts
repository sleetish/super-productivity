import { shell } from 'electron';
import { log, error } from 'electron-log/main';
import { isValidProtocol } from './url-validation-util';

export const openExternal = async (url: string): Promise<void> => {
  if (isValidProtocol(url)) {
    try {
      await shell.openExternal(url);
    } catch (e) {
      error(`Failed to open external URL: ${url}`, e);
    }
  } else {
    log(`Blocked opening external URL with unsafe protocol or invalid format: ${url}`);
  }
};
