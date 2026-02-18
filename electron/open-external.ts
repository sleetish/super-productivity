import { shell } from 'electron';
import { error } from 'electron-log/main';
import { openExternalUrl } from './open-external-util';

export const openExternal = async (url: string): Promise<void> => {
  return openExternalUrl(url, shell.openExternal, error);
};
