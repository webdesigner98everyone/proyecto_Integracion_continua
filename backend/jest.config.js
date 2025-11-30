export default {
  testEnvironment: "node",
  transform: {},
  coverageDirectory: "coverage",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "routes/**/*.js", "!**/node_modules/**"]
};
