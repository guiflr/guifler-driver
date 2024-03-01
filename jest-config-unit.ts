module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  testPathIgnorePatterns: ['./dist'],
  preset: 'ts-jest'
};
