import { URL } from 'url';

export const isValidProtocol = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:', 'mailto:'].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
};
