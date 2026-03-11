import { shell } from 'electron';
import { isValidExternalUrl } from './url-validator';
import { error } from 'electron-log/main';

export const openExternalUrl = async (url: string): Promise<void> => {
  if (isValidExternalUrl(url)) {
    // 🛡️ Security: Validate URL protocols to prevent executing malicious URIs like file:// or javascript:
    await shell.openExternal(url);
  } else {
    error(`Attempted to open an invalid or insecure external URL: ${url}`);
  }
};
