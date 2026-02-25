import { shell } from 'electron';
import { error } from 'electron-log/main';
import { isValidProtocol, normalizeUrl } from './url-validator';

export const openExternalUrl = async (url: string): Promise<void> => {
  try {
    const normalizedUrl = normalizeUrl(url);

    if (isValidProtocol(normalizedUrl)) {
      await shell.openExternal(normalizedUrl);
    } else {
      error('Blocked opening external URL with unsafe protocol:', url);
    }
  } catch (e) {
    error('Error opening external URL:', e);
  }
};
