## 2026-03-14 - Improve Plugin HTML Sanitization
**Vulnerability:** XSS vulnerability in `PluginSecurityService.sanitizeHtml` due to weak regex-based sanitization that allowed `on*` event handlers and dangerous tags like `object` and `embed`.
**Learning:** Regex is insufficient for HTML sanitization because HTML is not a regular language and browsers have complex error-handling and parsing rules that can bypass regex filters (e.g., `onerror`, `onload`).
**Prevention:** Use a robust `DOMParser` allow-list approach to parse HTML into a DOM tree and selectively remove dangerous tags and attributes before converting back to a string.
