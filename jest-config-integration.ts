import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  preset: 'ts-jest',
};

export default config;
