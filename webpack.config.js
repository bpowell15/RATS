const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", "*" ]
  },
  devtool: 'source-map',
};
