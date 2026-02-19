export const isValidExternalUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    // Protocol check is case-insensitive, but URL.protocol is usually lowercased.
    return ['https:', 'http:', 'mailto:'].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
};
