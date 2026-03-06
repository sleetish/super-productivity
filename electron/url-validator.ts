export const isValidExternalUrl = (urlStr: string): boolean => {
  try {
    const url = new URL(urlStr);
    return ['http:', 'https:', 'mailto:'].includes(url.protocol.toLowerCase());
  } catch (e) {
    return false;
  }
};
