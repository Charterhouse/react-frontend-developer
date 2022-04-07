module.exports = {
  projects: [
    'workspaces/buffers',
    'workspaces/css-grid-helper',
    'workspaces/react-layout-helpers'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['source/**.js', 'source/**.ts', '!**/*.test.js', '!**/node_modules/**'],
  coverageReporters: ['text-summary', 'lcov']
}
