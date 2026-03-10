export const isAllowedUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol.toLowerCase();
    return protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:';
  } catch (e) {
    return false;
  }
};
