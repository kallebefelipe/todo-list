const path = require('path');

module.exports = {
  entry: './assets/js/app.js',
  output: {
    path: path.join(__dirname, '/assets/js/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ],
    }],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/assets/js/')
  }
};

console.log(__dirname);
