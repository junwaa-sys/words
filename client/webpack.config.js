const { join } = require('node:path')
const path = require('path')
const BUILD_DIR = path.resolve(__dirname, '../server/public')

module.exports = {
  entry: { main: './client/index.js' },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
}
