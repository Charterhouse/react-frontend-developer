module.exports = {
  projects: [
    'workspaces/buffers',
    'workspaces/css-grid-helper'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'source/**.js',
    '!**/*.test.js',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    'text-summary',
    'lcov'
  ]
}
