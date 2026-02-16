import { isValidProtocol } from './url-validator';

const runTests = (): void => {
  const tests = [
    { input: 'http://example.com', expected: true },
    { input: 'https://example.com', expected: true },
    { input: 'mailto:user@example.com', expected: true },
    { input: 'file:///etc/passwd', expected: false },
    { input: 'javascript:alert(1)', expected: false },
    { input: 'vbscript:alert(1)', expected: false },
    { input: 'data:text/html,<html></html>', expected: false },
    { input: 'smb://server/share', expected: false },
    { input: '', expected: false },
    { input: 'not a url', expected: false },
    { input: 'www.example.com', expected: false },
  ];

  let failed = 0;
  tests.forEach(({ input, expected }) => {
    const result = isValidProtocol(input);
    if (result !== expected) {
      console.error(`FAIL: Input "${input}" expected ${expected} but got ${result}`);
      failed++;
    } else {
      console.log(`PASS: Input "${input}" -> ${result}`);
    }
  });

  if (failed > 0) {
    console.error(`${failed} tests failed.`);
    throw new Error('Tests failed');
  } else {
    console.log('All tests passed!');
  }
};

runTests();
