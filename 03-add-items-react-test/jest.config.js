module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFiles: ['<rootDir>/src/setupTests.tsx'],
};
