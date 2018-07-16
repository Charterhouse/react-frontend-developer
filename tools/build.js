const fs = require('fs')
const execSync = require('child_process').execSync
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

class Builder {
  constructor ({umdFileName}) {
    this.umdFileName = umdFileName
  }

  exec (command, extraEnv) {
    execSync(command, {
      stdio: 'inherit',
      env: Object.assign({}, process.env, extraEnv)
    })
  }

  build () {
    console.log('Building CommonJS modules ...')

    this.exec('babel source -d lib --delete-dir-on-start --no-babelrc', {
      BABEL_ENV: 'commonjs'
    })

    console.log('\nBuilding ES modules ...')

    this.exec('babel source -d es --delete-dir-on-start --no-babelrc', {
      BABEL_ENV: 'es'
    })

    console.log('\nBuilding UMD module ...')

    this.exec(`rollup -c -f umd -o umd/${this.umdFileName}.js`, {
      BABEL_ENV: 'umd',
      NODE_ENV: 'development'
    })

    console.log('\nBuilding minimized UMD module ...')

    this.exec(`rollup -c -f umd -o umd/${this.umdFileName}.min.js`, {
      BABEL_ENV: 'umd',
      NODE_ENV: 'production'
    })

    const size = gzipSize.sync(
      fs.readFileSync(`umd/${this.umdFileName}.min.js`)
    )

    console.log('\ngzipped, the UMD build is %s', prettyBytes(size))
  }
}

module.exports = { Builder }
