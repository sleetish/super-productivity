import { shell } from 'electron';
import { error } from 'electron-log/main';

// Define interfaces for dependencies to make testing easier
interface Shell {
  openExternal(url: string, options?: any): Promise<void>;
}

interface Logger {
  (...params: any[]): void;
}

export const createOpenExternal =
  (shellImpl: Shell, loggerImpl: Logger) =>
  async (url: string): Promise<void> => {
    try {
      const urlObj = new URL(url);

      // Security: Only allow http, https, and mailto protocols
      const allowedProtocols = ['http:', 'https:', 'mailto:'];
      if (!allowedProtocols.includes(urlObj.protocol)) {
        loggerImpl(
          `Blocked attempt to open external URL with disallowed protocol: ${url}`,
        );
        return;
      }

      // needed for mac; especially for jira urls we might have a host like this www.host.de//
      urlObj.pathname = urlObj.pathname.replace('//', '/');
      const wellFormedUrl = urlObj.toString();

      await shellImpl.openExternal(wellFormedUrl);
    } catch (err) {
      loggerImpl(`Failed to open external URL: ${url}`, err);
    }
  };

// Default instance using actual Electron shell and logger
export const openExternal = createOpenExternal(shell as unknown as Shell, error);
