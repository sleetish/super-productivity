import { shell } from 'electron';
import { isValidProtocol } from './url-validator';
import { error } from 'electron-log/main';

export const openExternal = async (url: string): Promise<void> => {
  // robust URL cleaning
  let cleanUrl = url;
  try {
    const urlObj = new URL(url);
    urlObj.pathname = urlObj.pathname.replace('//', '/');
    cleanUrl = urlObj.toString();
  } catch (e) {
    error('Invalid URL:', url);
    return;
  }

  if (isValidProtocol(cleanUrl)) {
    await shell.openExternal(cleanUrl);
  } else {
    error('BLOCKED: openExternal called with unsafe URL:', url);
  }
};
