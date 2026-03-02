## 2024-05-24 - Secure Random Identifier Generation
**Vulnerability:** Weak random number generation using `Math.random()` for client IDs.
**Learning:** `Math.random()` is predictable and not suitable for security-sensitive identifiers. When generating identifiers used in distributed systems or sync architectures (like operation logs), predictable IDs can lead to collisions or guessing attacks.
**Prevention:** Use cryptographically secure pseudorandom number generators (CSPRNGs) like `window.crypto.getRandomValues()` for any identifiers that have security implications or require uniqueness guarantees across distributed systems. Furthermore, when mapping random bytes to a character set (like base62), use rejection sampling to avoid modulo bias and ensure an even distribution.
