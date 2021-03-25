const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Check for environment flag
const isProd = env => env && env.hasOwnProperty('production')

module.exports = env => ({
  mode: isProd(env) ? "production" : "development",
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, "./dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        target: 'es2016'
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
})
