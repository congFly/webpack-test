/**
 * Created by 18829 on 2017/10/15.
 */
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 将 CSS 文件打包为一个单独文件


module.exports = {
    entry: './app/index.js', // 入口文件
     /*  entry: {
     index: ['./app/index.js'], // 入口文件
     test: ['./app/test.js']
     },*/
    output: {
        path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
        filename: "bundle.js" // 打包后输出文件的文件名
        // filename: "./deploy/[name].js"
    },
    module: {
        rules: [
            {
                // js 文件才使用 babel
                test: /\.js$/,
                // 使用哪个 loader
                use: 'babel-loader',
                // 不包括路径
                exclude: /node_modules/
            },

/*
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },*/
            {
                test: /\.css$/,
                // 写法和之前基本一致
                loader: ExtractTextPlugin.extract({
                    // 必须这样写，否则会报错
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }]
                })
            },

            /*    {
             test: /\.(jpg|png|gif|svg)$/,
             loader: "file-loader?limit=8192&name=images/[hash:8].[name].[]"
             },*/
            {
                // 图片格式正则
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        // 配置 url-loader 的可选项
                        options: {
                            // 限制图片大小 10000B，小于限制会将图片转换为 base64格式
                            limit: 10000,
                            // 超出限制，创建的文件格式
                            // build/images/[图片名].[hash].[图片格式]
                            name: 'build/images/[name].[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 输出的文件路径
        new ExtractTextPlugin("css/[name].[hash].css")
    ]
}