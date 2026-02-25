## 2024-02-12 - [CRITICAL] Fix unsafe external URL opening
**Vulnerability:** The Electron application was configured to open external URLs via `shell.openExternal(url)` without validating the protocol. This could allow an attacker to open dangerous protocols like `file://` or execute arbitrary code via `javascript:` or other schemes.
**Learning:** Even though `shell.openExternal` is generally safer than `child_process.exec`, it still respects the OS protocol handlers. Without explicit validation, it can be abused.
**Prevention:** Use a wrapper function like `openExternalUrl` that strictly validates the protocol against an allowlist (e.g., `http:`, `https:`, `mailto:`) before calling `shell.openExternal`.
