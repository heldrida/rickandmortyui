const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')

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
    }, {
      test: /\.(png|jpe?g|svg)$/,
      loader: 'file-loader'
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2016',
        minify: true,
        exclude: /node_modules/,
      })
    ],
    splitChunks: {
      chunks: 'all',
    },
  }
})
