var webpack = require("webpack");

module.exports = {
  entry: {
    "app": "./index.ts"
  },
  output: {
    path: __dirname,
    filename: "./_build_/[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      }, {
        test: /\.json/,
        loaders: ['json-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"common", /* filename= */"./_build_/common.bundle.js")
  ]
}
