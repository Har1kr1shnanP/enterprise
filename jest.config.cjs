module.exports = {
  testEnvironment: "node",
  verbose: true,
  collectCoverage: false,
  testTimeout: 30000,
  coverageDirectory: "coverage",
  transform: {
    '^.+\\.js$': 'babel-jest', // Transform JavaScript files using babel-jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!supertest|your-es6-module-to-transpile)/" // Transpile the supertest module
  ],
};
