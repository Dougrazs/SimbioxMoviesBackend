module.exports = {
  roots: ["<rootDir>/src"],
  transform: { ".+\\.ts$": "ts-jest" },
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageProvider: "v8",
  testEnvironment: "node",
};
