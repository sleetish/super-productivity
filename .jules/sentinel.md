## 2024-05-22 - [Electron: Unrestricted External Protocol Handling]
**Vulnerability:** The Electron main process allowed arbitrary protocol execution via `shell.openExternal`, which could be exploited via IPC to launch dangerous protocols (e.g., `file://`, `javascript:`, or custom handlers).
**Learning:** Electron main process utilities should avoid direct `electron` imports if they need to be unit tested in a standard Node.js environment. Using `require` inside try-catch blocks with dependency injection allows for testing without complex mocks.
**Prevention:** Always use a wrapper around `shell.openExternal` that explicitly whitelists safe protocols (`http:`, `https:`, `mailto:`).
