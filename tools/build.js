const fs = require('fs')
const execSync = require('child_process').execSync
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

class Builder {
  constructor ({ iifeFileName }) {
    this.iifeFileName = iifeFileName
  }

  exec (command, extraEnv) {
    execSync(command, {
      stdio: 'inherit',
      env: Object.assign({}, process.env, extraEnv)
    })
  }

  build () {
    console.log('\n---------------------------------------------------')
    console.log(`Building ${this.iifeFileName}`)
    console.log('Building CommonJS modules ...')

    this.exec('babel source -d lib --delete-dir-on-start --no-babelrc --source-maps', {
      BABEL_ENV: 'commonjs'
    })

    console.log('\nBuilding ES modules ...')

    this.exec('babel source -d es --delete-dir-on-start --no-babelrc --source-maps', {
      BABEL_ENV: 'es'
    })

    console.log('\nBuilding IIFE module ...')

    this.exec(`rollup -c -m -f iife -o iife/${this.iifeFileName}.js`, {
      BABEL_ENV: 'iife',
      NODE_ENV: 'development'
    })

    console.log('\nBuilding minimized IIFE module ...')

    this.exec(`rollup -c -m -f iife -o iife/${this.iifeFileName}.min.js`, {
      BABEL_ENV: 'iife',
      NODE_ENV: 'production'
    })

    const size = gzipSize.sync(
      fs.readFileSync(`iife/${this.iifeFileName}.min.js`)
    )

    console.log('\ngzipped, the IIFE build is %s', prettyBytes(size))
    console.log('---------------------------------------------------\n')
  }
}

module.exports = { Builder }
