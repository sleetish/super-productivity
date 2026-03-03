## 2024-05-24 - [Enforce safe protocols for external URLs]
**Vulnerability:** Electron main process was using `shell.openExternal` directly to open URLs from untrusted sources, which could lead to arbitrary code execution if URLs with unsafe protocols (like `file://`) were provided.
**Learning:** All external URLs in the Electron main process must be opened via a centralized validator to restrict protocols to http:, https:, and mailto: to prevent security vulnerabilities like arbitrary code execution via file:// or other custom protocols.
**Prevention:** Use `openExternalUrl` from `electron/open-external.ts` which leverages `isValidExternalUrl` to safely validate URLs before passing them to `shell.openExternal`.
