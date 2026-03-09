export const isValidExternalUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const validProtocols = ['http:', 'https:', 'mailto:'];
    return validProtocols.includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
};
