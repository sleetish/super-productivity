export const isValidExternalUrl = (urlStr: string): boolean => {
  try {
    const url = new URL(urlStr);
    const protocol = url.protocol.toLowerCase();
    return protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:';
  } catch (e) {
    // If it's not a valid URL, reject it
    return false;
  }
};
