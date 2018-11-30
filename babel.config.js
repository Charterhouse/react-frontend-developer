module.exports = function (api) {
  const babelEnv = api.env()
  api.cache(true)

  const presets = setupPresets(babelEnv)
  const plugins = setupPlugins()
  const ignore = setupIgnoredFiles(babelEnv)

  return {
    presets,
    plugins,
    ignore
  }
}

function setupPresets (babelEnv) {
  let presetEnv = '@babel/preset-env'

  if (babelEnv === 'es' || babelEnv === 'iife') {
    presetEnv = ['@babel/preset-env', { modules: false }]
  }

  return [presetEnv, '@babel/preset-react']
}

function setupPlugins () {
  return [
    'emotion',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties'
  ]
}

function setupIgnoredFiles (babelEnv) {
  let ignore

  if (babelEnv !== 'test') {
    ignore = ['**/*.test.js']
  }

  return ignore
}
