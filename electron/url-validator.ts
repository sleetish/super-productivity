export const isValidExternalUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:'];
    return ALLOWED_PROTOCOLS.includes(urlObj.protocol);
  } catch (e) {
    return false;
  }
};
