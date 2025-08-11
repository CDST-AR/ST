module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^https://www\\.gstatic\\.com/firebasejs/9.15.0/(.*)$': '<rootDir>/JS/__mocks__/$1'
  },
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
