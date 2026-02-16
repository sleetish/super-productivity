export const isValidProtocol = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    // Allow http, https, and mailto schemes
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch (e) {
    console.error(`Error parsing URL: ${url}`, e);
    return false;
  }
};
