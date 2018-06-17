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
    historyApiFallback:{index:'./frontend/templates/frontend/home.html'},
    contentBase: './',
    hot: true
  },
};

console.log(__dirname);
