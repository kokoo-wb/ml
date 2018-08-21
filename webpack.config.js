// webpack 3.x 的配置
var path = require('path')
var glob = require('globby')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// CSS入口配置
var CSS_PATH = {
    css: {
        pattern: './src/**/*.less',
        src: path.join(__dirname, 'css'),
        dst: path.resolve(__dirname, 'dist/css'),
    }
}

// 遍历除所有需要打包的CSS文件路径
function getCSSEntries(config) {
    var fileList = glob.sync(config.pattern)
    console.log(fileList);
    return fileList.reduce(function(previous, current) {
        var filePath = path.parse(path.relative(config.src, current))
        var withoutSuffix = path.join(filePath.dir, filePath.name)
        previous[withoutSuffix] = path.resolve(__dirname, current)
        return previous
    }, {})
}

module.exports = [{
        context: path.resolve(__dirname),
        entry: getCSSEntries(CSS_PATH.css),
        output: {
            path: CSS_PATH.css.dst,
            filename: '[name].css'
        },
        module: {
            rules: [{
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            }]
        },
        resolve: {
            extensions: ['.less']
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
        ]
    },
    // 如果还需要打包js，则可以在这里增加一个单独打包js的处理【根据自己需求来】
    // {
    //    entry:{},
    //    output:{},
    //    ... 省略
    // }
]