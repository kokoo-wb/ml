// webpack 3.x 的配置
var path = require('path')
var glob = require('globby')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// CSS入口配置
var PATH_ENUM = {
    css: {
        pattern: './src/less/**/*.less',
        src: path.join(__dirname, 'src/less'),
        dst: path.join(__dirname, 'dist'),
    }
}

// 遍历除所有需要打包的CSS文件路径
function getCSSEntries(config) {
    var fileList = glob.sync(config.pattern)
    return fileList.reduce(function(previous, current) {
        var filePath = path.parse(path.relative(config.src, current))
        var withoutSuffix = path.join(filePath.dir, filePath.name)
        previous[withoutSuffix] = path.resolve(__dirname, current)
        return previous
    }, {})
}

var config = {
    // context: path.resolve(__dirname),
    entry: getCSSEntries(PATH_ENUM.css),
    output: {
        publicPath: '../',
        path: path.join(__dirname, './src/css'),
        filename: '[name].css'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'postcss-loader', 'less-loader']
            }),
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|gif|jpg)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: '../images/[name].[ext]'
                }
            }],
            include: path.join(__dirname, 'src')
        }]
    },
    resolve: {
        extensions: ['.less']
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}


// 如果还需要打包js，则可以在这里增加一个单独打包js的处理【根据自己需求来】
// {
//    entry:{},
//    output:{},
//    ... 省略
// }

module.exports = config