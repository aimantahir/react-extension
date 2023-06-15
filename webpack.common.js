const path = require('path') // The path module is imported using the require function. This module is used to work with file and directory paths.
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  // The configuration object is exported as a module using module.exports.
  entry: {
    popup: path.resolve('/src/popup/popup.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/contentScript.ts'),
  }, //tells webpack where to start, The entry property specifies the entry point of the application. In this case, it is set to './src/test.tsx', indicating that the application starts from the test.tsx file located in the src directory.
  module: {
    //define additional rules, by default they only handle simple files like js and json files, inorder to handle like ts files we need another loader, The module property is used to define additional rules for handling different types of files.
    rules: [
      // In this case, a rule is defined for handling TypeScript files (tsx and ts).
      {
        use: 'ts-loader', //The ts-loader is used to process the TypeScript files and transpile them to JavaScript
        test: /\.tsx?$/, //The test property specifies the file extensions to be matched, and the exclude property excludes the node_modules directory from being processed.
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/i,
      },
      {
        type: 'asset/resource',
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['popup', 'options']),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'], //The resolve property is used to specify the file extensions that should be resolved by webpack. In this case, the extensions '.tsx', '.ts', and '.js' are specified. This allows you to import files with these extensions without explicitly specifying the extension in the import statements.
  },
  output: {
    //he output property specifies the configuration for the bundled output files. The filename property determines the name of the bundled file, which in this case is 'index.js'. The path property specifies the output directory for the bundled file using the path.resolve function to resolve the directory name based on the current file (__dirname) and the 'dist' directory.
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

//Overall, this configuration sets up webpack to bundle the application starting from the test.tsx file, transpile TypeScript files using ts-loader, and output the bundled file as 'index.js' in the dist directory.

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  )
}
