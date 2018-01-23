var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const ENTRY_PATH = path.resolve(SRC_PATH, 'js/entry');
const STATIC_PATH = path.resolve(ROOT_PATH, 'static');

module.exports = {
    entry: {
        index1: [ENTRY_PATH + '/index1_entry.js'],
        index2: [ENTRY_PATH + '/index2_entry.js']
    },
    output: {
        path: STATIC_PATH,
        publicPath: '/static/',
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(css|less)$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                }))
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        attrs: [':src']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[hash].[ext]'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),

        new HtmlWebpackPlugin({
            favicon: './src/favicon.ico',
            filename: '../views/index1.html',
            template: './src/template/index1.html',
            inject: 'body',
            hash: true,
            chunks: ['index1'],
            minify: {   //压缩HTML文件
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({
            favicon: './src/favicon.ico',
            filename: '../views/index2.html',
            template: './src/template/index2.html',
            inject: 'body',
            hash: true,
            chunks: ['index2'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),

        new webpack.BannerPlugin('author: Vinson-sheep')
    ]

};