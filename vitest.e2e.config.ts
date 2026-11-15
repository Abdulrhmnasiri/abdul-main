import { defineConfig } from 'vitest/config';

// Browser tests: they need `npm run build` and installed Playwright browsers.
export default defineConfig({
  test: {
    include: ['tests/e2e/**/*.e2e.test.ts'],
    testTimeout: 60_000,
    hookTimeout: 60_000,
    fileParallelism: false,
  },
});
