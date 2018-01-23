var webpack = require('webpack');
var path = require('path');

// extract-text-webpack-plugin插件，
// 有了它就可以将你的样式提取到单独的css文件里
// 妈妈再也不用担心样式会被打包到js文件里了。
var HtmlWebpackPlugin = require('html-webpack-plugin');

// html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// 定义一些文件夹路径
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const ENTRY_PATH = path.resolve(SRC_PATH, 'js/entry');
const STATIC_PATH = path.resolve(ROOT_PATH, 'static');

module.exports = {
    entry: { //配置入口文件，有几个写几个
        // webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true 热重载必填
        index1: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true', ENTRY_PATH + '/index1_entry.js'],
        index2: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true', ENTRY_PATH + '/index2_entry.js']
    },
    output: {
        path: STATIC_PATH,    //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/static/',     //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js'   //每个页面对应的主js的生成配置
    },
    devtool: 'eval-source-map', // 开发工具，能生成map文件，js报错时会指出源文件错误位置
    module: {
        loaders: [  // 加载器，关于各个加载器的参数配置，可自行搜索之。
            {
                test: /\.(css|less)$/,
                // 配置css、less、sass的抽取器、加载器。
                // css-hot-loader是配合extract-text-plugin使用
                // 不嵌入js而单独打包的js文件使用css-hot-loader才能热重载
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
                // 让html文件在入口js文件被引用，但是不会被编译打包
                // 这样可以让html文件被修改时候热更新
                use: {
                    loader: "html-loader",
                    options: {
                        attrs: [':src']
                    }
                }
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[hash].[ext]'
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),

        // HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
        new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
            favicon: './src/favicon.ico',    // favicon路径，通过webpack引入同时可以生成hash值
            filename: '../views/index1.html',   //生成的html存放路径，相对于path
            template: './src/template/index1.html', //html模板路径
            inject: 'body',     //js插入的位置，true/'head'/'body'/false
            hash: true,     //为静态资源生成hash值
            chunks: ['index1'],     //需要引入的chunk，不配置就会引入所有页面的资源
            minify: {   //压缩HTML文件
                removeComments: true,   //移除HTML中的注释
                collapseWhitespace: false   //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
            favicon: './src/favicon.ico',    // favicon路径，通过webpack引入同时可以生成hash值
            filename: '../views/index2.html',   //生成的html存放路径，相对于path
            template: './src/template/index2.html', //html模板路径
            inject: 'body',     //js插入的位置，true/'head'/'body'/false
            hash: true,     //为静态资源生成hash值
            chunks: ['index2'],     //需要引入的chunk，不配置就会引入所有页面的资源
            minify: {   //压缩HTML文件
                removeComments: true,   //移除HTML中的注释
                collapseWhitespace: false   //删除空白符与换行符
            }
        }),

        new webpack.BannerPlugin('author: Vinson-sheep'),   // 为生成的js/css文件添加头部标签
        new webpack.HotModuleReplacementPlugin()    //热加载
    ],
    // devServer: {
    //     contentBase: './', //本地服务器所加载的页面所在的目录
    //     inline: true, //实时刷新
    //     hot: true   //热启动
    // }

};