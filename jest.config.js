module.exports = {
  projects: [
    'workspaces/buffers',
    'workspaces/css-grid-helper',
    'workspaces/react-layout-helpers',
    'workspaces/react-redux-render-prop'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['source/**.js', '!**/*.test.js', '!**/node_modules/**'],
  coverageReporters: ['text-summary', 'lcov']
}
