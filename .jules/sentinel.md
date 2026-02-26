## 2024-05-22 - Missing URL Validation in Open External
**Vulnerability:** The application uses `shell.openExternal` in `electron/ipc-handlers/system.ts` and `electron/main-window.ts` without validating the URL scheme. This could allow an attacker to execute arbitrary code or commands if they can control the URL (e.g., using `file://`, `javascript:`, or other dangerous protocols).
**Learning:** Electron's `shell.openExternal` is powerful but dangerous if inputs aren't sanitized. Always restrict allowed protocols to `http:` and `https:` unless there's a specific need for others.
**Prevention:** Implement a strict URL validator that only permits known safe protocols (http, https, mailto) before passing the URL to `shell.openExternal`.
