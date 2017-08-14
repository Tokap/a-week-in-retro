// @noflow
const path = require('path')
// Can only use native node packages

module.exports = {
  // What is our starting point?
  entry: {
    // Grab the following array of files and stuff them into a file named:
    'our-name': [
      // Path is relative to the config file.
      // In this example, the first file we grab is the require statements.
      // These import the packages needed to transform the JS running through
      // the transpiling process set forth below.
      './src/browser/transform-requirements'

      // Another file to load. In this example, the clientside JS.
      , './src/browser/file-two'
    ]
  }
  // Take those files and put them into
  , output: {
    // a folder named js, and the output file is named our-name from above
    filename: 'js/[name].js'
    // that folder & file get delivered to the path:
    , path: path.resolve(__dirname, 'assets')
  }
  // What are we doing with the files we just moved?
  , module: {
    // The rules for our module are:
    rules: [
      { // test for ending in a .js
        test: /\.js$/
        // ignore node modules
        , exclude: /node_modules/
        // and use babel-loader for the process
        , loader: 'babel-loader'
      }
    ]
  }

}
