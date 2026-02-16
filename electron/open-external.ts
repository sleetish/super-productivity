import { shell } from 'electron';
import { isValidProtocol } from './url-validator';
import { error } from 'electron-log/main';

export const openExternal = async (url: string): Promise<void> => {
  // Normalize URL to handle double slashes, e.g. for some Jira URLs
  let cleanUrl = url;
  try {
    const urlObj = new URL(url);
    if (urlObj.pathname.includes('//')) {
      urlObj.pathname = urlObj.pathname.replace('//', '/');
      cleanUrl = urlObj.toString();
    }
  } catch (e) {
    error('openExternal: Failed to parse URL', url, e);
    return;
  }

  if (isValidProtocol(cleanUrl)) {
    await shell.openExternal(cleanUrl);
  } else {
    error('BLOCKED: openExternal called with unsafe URL:', url);
  }
};
