## 2024-05-24 - Validate openExternal URLs
**Vulnerability:** Unsanitized `shell.openExternal(url)` allows opening dangerous protocols like `file://` or `smb://`.
**Learning:** Electron's `shell.openExternal` blindly opens whatever is passed. Validation must be done before calling it.
**Prevention:** Implement a wrapper `openExternal` function that allows only `http:`, `https:`, and `mailto:` protocols.
