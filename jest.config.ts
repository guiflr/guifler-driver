/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/__tests__/singleton.ts'],
  testPathIgnorePatterns: ['./dist'],
};

export default config;
