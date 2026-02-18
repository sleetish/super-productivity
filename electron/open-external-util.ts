const ALLOWED_PROTOCOLS = ['https:', 'http:', 'mailto:'];

export const openExternalUrl = async (
  url: string,
  openExternalFn: (url: string) => Promise<void>,
  logErrorFn: (msg: string, ...args: any[]) => void,
): Promise<void> => {
  try {
    const urlObj = new URL(url);
    // needed for mac; especially for jira urls we might have a host like this www.host.de//
    urlObj.pathname = urlObj.pathname.replace('//', '/');
    const wellFormedUrl = urlObj.toString();

    if (ALLOWED_PROTOCOLS.includes(urlObj.protocol)) {
      await openExternalFn(wellFormedUrl);
    } else {
      logErrorFn('Blocked opening external url because of blocked protocol: ' + url);
    }
  } catch (e) {
    logErrorFn('Failed to open external url: ' + url, e);
  }
};
