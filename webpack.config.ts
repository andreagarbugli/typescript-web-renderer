// eslint-disable-next-line no-unused-vars
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: webpack.Configuration = {
  entry: './src/index.ts',
  target: 'web',
  mode: 'development',
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    writeToDisk: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          name: '/[name].[ext]',
          outputPath: 'assets/textures/'
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        options: {
          name: '/[name].[ext]',
          outputPath: 'assets/models/'
        }
      },
      {
        test: /\.(glsl|vert|frag)$/,
        loader: 'file-loader',
        options: {
          name: '/[name].[ext]',
          outputPath: 'assets/shaders/'
        }
        // use: [
        //   'raw-loader',
        //   {
        //     loader: 'glslify-loader',
        //     options: {
        //       name: '/[name].[ext]',
        //       outputPath: 'assets/shaders/'
        //     }
        //   }
        // ]
      }
    ]
  },
  resolve: {
    extensions: ['tsx', '.ts', '.js']
  }
};

export default config;
