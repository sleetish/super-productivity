## 2026-03-08 - Protect external link opening in Electron
**Vulnerability:** External URLs opened directly using `shell.openExternal()` could potentially allow loading disallowed protocols.
**Learning:** `shell.openExternal()` should be wrapped with an input validation layer verifying that the URL's protocol is `http:`, `https:`, or `mailto:` to minimize exposure to risky URI handlers.
**Prevention:** Implement an `openExternalUrl` wrapper around `shell.openExternal` and use it exclusively across the Electron app.
