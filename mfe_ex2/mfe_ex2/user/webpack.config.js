const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').devDependencies;
//
module.exports = {
  mode: 'development',
  devServer: {
    port: 3002,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
      {
        name: 'USER',
        filename: 'remoteEntry.js',
        shared: [
          {
            ...deps,
            react: { requiredVersion: deps.react, singleton: true },
            'react-dom': {
              requiredVersion: deps['react-dom'],
              singleton: true,
            },
          },
        ],
      }
    ),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};