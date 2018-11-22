/* global __dirname, require, module */

const path = require('path')

const libraryName = `react-frontend-developer-${require('./package.json').name}`
const outputFile = 'index.js'

const config = {
  mode: 'development',
  entry: path.join(__dirname, 'index.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types'
    },
    'react-emotion': {
      commonjs: 'react-emotion',
      commonjs2: 'react-emotion'
    },
    'emotion': {
      commonjs: 'emotion',
      commonjs2: 'emotion'
    },
    'semantic-ui-css': {
      commonjs: 'semantic-ui-css',
      commonjs2: 'semantic-ui-css'
    },
    'semantic-ui-react': {
      commonjs: 'semantic-ui-react',
      commonjs2: 'semantic-ui-react'
    }
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          babelrc: false,
          presets: ['@babel/env', '@babel/preset-react'],
          plugins: [
            ['emotion', { 'hoist': true }],
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties'
          ]
        }
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              relativeUrls: true
            }
          }
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.js', '.jsx']
  }
}

module.exports = config
