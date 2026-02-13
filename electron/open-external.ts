import { shell } from 'electron';
import { error } from 'electron-log/main';

export const openExternalUrl = (url: string): void => {
  const ALLOWED_PROTOCOLS = ['https:', 'http:', 'mailto:'];

  try {
    const urlObj = new URL(url);
    if (ALLOWED_PROTOCOLS.includes(urlObj.protocol)) {
      shell.openExternal(url).catch((err) => {
        error('Failed to open external URL:', url, err);
      });
    } else {
      error('Blocked opening external URL with invalid protocol:', url);
    }
  } catch (e) {
    error('Failed to parse URL for external open:', url, e);
  }
};
