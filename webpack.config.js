const webpack = require('webpack');
const glob = require('glob');

// var files = glob.sync("./app/**/*.js");
// console.log(files)
module.exports = {
  entry: {
    app:"./app/app.js",
    vendor: ['angular','angular-ui-router']
  },
  output: {
    path: __dirname,
    filename:'./public/js/bundle.js'
  },
  plugins:
    [
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./public/js/vendor.bundle.js")
    ],
  resolve:{
    extensions: ['','.js']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        },
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }

};
