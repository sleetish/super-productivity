## 2024-05-24 - Weak Random Number Generation in `ClientIdService`
**Vulnerability:** Weak Random Number Generation in `ClientIdService`
**Learning:** `Math.random()` was being used to generate a 4-character base62 random string, which isn't cryptographically secure. `crypto.getRandomValues()` should be used instead.
**Prevention:** Use `crypto.getRandomValues()` or a robust CSPRNG to generate sensitive or unique identifiers instead of `Math.random()`.
