import { shell } from 'electron';
import { log } from 'electron-log/main';

export const openExternalUrl = async (url: string): Promise<void> => {
  // Check if the URL is valid
  if (!url) {
    return;
  }

  try {
    const urlObj = new URL(url);
    // Only allow http, https and mailto protocols
    if (['http:', 'https:', 'mailto:'].includes(urlObj.protocol)) {
      await shell.openExternal(url);
    } else {
      log('Blocked opening external URL with unsafe protocol:', url);
    }
  } catch (err) {
    log('Failed to open external URL:', url, err);
  }
};
