
## 2024-05-24 - Unrestricted shell.openExternal Risk

**Vulnerability:**
Calls to `shell.openExternal` in `electron/ipc-handlers/system.ts` and `electron/main-window.ts` lack URL scheme validation. This could allow an attacker to execute arbitrary local commands by providing a malicious URL (like `file://`, `javascript:`, or OS-specific custom protocol handlers like `ms-msdt://`).

**Learning:**
Any URL passed to `shell.openExternal` from user input or IPC must be strictly validated to ensure only safe schemes (e.g. `http:`, `https:`, `mailto:`) are allowed. Unrestricted execution is a path to remote code execution (RCE).

**Prevention:**
Enforce URL scheme validation before calling `shell.openExternal`. In `electron/url-validator.ts` and `electron/open-external.ts`, create a wrapper `openExternalUrl` that uses an allowlist for known-good protocols. Replace all instances of `shell.openExternal` with this wrapper.
