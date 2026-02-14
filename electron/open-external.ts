import { shell } from 'electron';
import { error } from 'electron-log/main';

export const openExternalUrl = async (url: string): Promise<void> => {
  try {
    const urlObj = new URL(url);
    // Allow http, https, and mailto
    if (!['https:', 'http:', 'mailto:'].includes(urlObj.protocol)) {
      error(`Blocked opening external URL with unsafe protocol: ${url}`);
      return;
    }

    await shell.openExternal(url);
  } catch (err) {
    error(`Failed to open external URL: ${url}`, err);
  }
};
