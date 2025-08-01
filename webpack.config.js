const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: { main: './src/scripts/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  },
    mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
       {
    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource'
  },
  {
    // применять это правило только к CSS-файлам
    test: /\.css$/,
    // при обработке этих файлов нужно использовать
    // MiniCssExtractPlugin.loader и css-loader
    use: [MiniCssExtractPlugin.loader, {
      loader: 'css-loader',
      options: { importLoaders: 1 }
    },
   'postcss-loader']
  }
    ]
  },
  plugins: [
        new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin() 
      ]
}; 