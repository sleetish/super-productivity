/**
 * Normalizes URL to handle Jira double-slash issue.
 * @param url The URL to normalize.
 * @returns The normalized URL.
 */
export const normalizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    // needed for mac; especially for jira urls we might have a host like this www.host.de//
    if (urlObj.pathname.includes('//')) {
      urlObj.pathname = urlObj.pathname.replace('//', '/');
    }
    return urlObj.toString();
  } catch (e) {
    // If URL parsing fails, return original string (let validation handle it)
    return url;
  }
};

/**
 * Checks if the protocol is allowed (http, https, mailto).
 * @param url The URL to check.
 * @returns True if allowed, false otherwise.
 */
export const isValidProtocol = (url: string): boolean => {
  try {
    const protocol = new URL(url).protocol.toLowerCase();
    return ['http:', 'https:', 'mailto:'].includes(protocol);
  } catch (e) {
    return false;
  }
};
