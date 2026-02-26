
export const isValidExternalUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    return allowedProtocols.includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
};
