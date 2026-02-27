## 2026-02-27 - [MEDIUM] Enhance Client ID Security
**Vulnerability:** Weak random number generation (`Math.random()`) used for client ID generation in `ClientIdService`.
**Learning:** `Math.random()` is predictable and biased. For generating identifiers that may have collision or security implications, a cryptographically secure pseudo-random number generator (CSPRNG) must be used. Additionally, to avoid modulo bias when mapping a byte to a specific character set (like Base62), rejection sampling is required.
**Prevention:** Use `window.crypto.getRandomValues()` or `globalThis.crypto.getRandomValues()` along with a rejection sampling loop for secure random string generation instead of `Math.random()`.
