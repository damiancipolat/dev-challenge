const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path              = require('path');

module.exports = {

  // the entry file for the bundle
  entry: path.join(__dirname, '/src/app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '../web/js'),
    filename: 'app.js',
  },
  // Add rule to copy assets files to static image folder.
  plugins: [
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin([{from:'src/assets/img',to:path.join(__dirname, '../web/img')}])
  ],
  module: {

    // apply loaders to files that meet given conditions
    loaders: [

      // Load JSX
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        include: path.join(__dirname, '/src'),
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      },
      
      // Load JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, '/src'),
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      },
      //LOAD CSS
      {
        test  : /\.css/, 
        loader: ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader"})
      },
      //LOAD LESS
      {
        test  : /\.less$/, 
        loader:  ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader!less-loader"})
      },
      // Load IMAGES
      {
        test: /\.(jpe?g|png|gif|svg|jpg)$/i,
        exclude: /node_modules/,
        include: path.join(__dirname, '/src/assets/img'),
        loader: "file?name=[path][name].[ext]&context=./img"
      },

      // Load URL
      {
        test: /\.(jpe?g|png|gif|svg|jpg)$/i,
        exclude: /node_modules/,
        include: path.join(__dirname, '/src/assets/img'),
        loader: "url-loader"
      }
    ]

  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true,
  //Esto permite usar el debugger desde el navegador para ver el component y no el bundle
  devtool: 'cheap-module-eval-source-map'
}