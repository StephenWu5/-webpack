const path = require('path');
// extract-text-webpack-plugin 已经过时了
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//在vue-loader中拿到VueLoaderPlugin函数
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    // 模块的入口
    // entry: {name: './main.js', nameCopy: './main copy.js'},
    entry: () => {
        // return ['./ex6modules.js'];
        // return ['./main.js', './main copy.js'];
        return ['./main.js'];
    },
    // 
    // content: path.resolve(__dirname, './public'),
    // 最终代码的输出
    output: {
        // [name] 对应 chunk的名称
        filename: 'js/[id].[name].[hash:8].[chunkhash:8].bundle.js',
        // chunkFilename 是一个被main.js异步加载的间接的JS文件。那么如果我们打包一个间接的JS文件的话，就会走chunkFilename这个配置项
        chunkFilename: 'chunkJs/[name].min.js',
        // path: path.resolve(__dirname, './dist_[hash]'),
        path: path.resolve(__dirname, './dist'),
        // 资源路径引用
        publicPath: './',
        // 用于配置crossOriginLoading配置异步插入标签的crossorigin值
        crossOriginLoading: 'use-credentials',
        // libraryTarget 导出库的方式： this commonjs commonjs2 var window global var是默认
        libraryTarget: 'commonjs',
        library: 'libraryName66',
        libraryExport: 'a',
    },
    // mode: isProduction ? 'production' : 'development',
    mode: 'development',
    module: {
        noParse: /jquery|chartjs/, // 不去解析jquery中的依赖关系，
        rules: [{
            // eslint-loader 代码检查
            test: [/\.js$/],
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
                // 放在最前
                enforce: "prev",
            }
        }, {
            // tslint-loader 代码检查
            test: [/\.ts$/],
            loader: 'tslint-loader',
            exclude: /node_modules/,
            options: {
                // 放在最前
                enforce: "prev",
            }
        }, {
            // 处理vue项目的文件
            // vue-loader: 将vue文件分为三部分样式，js和html。 css-loader处理样式  vue-template-compiler 处理html
            test: [/\.vue$/],
            use: ['vue-loader'],
            exclude: /node_modules/,
        }, {
            // ts-loader 把typeScript转化为javascript的代码
            test: [/\.ts$/, /\.tsx$/],
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                // 让tsc将vue 文件当作typescript模块来处理
                appendTsSuffixTo: [/\.vue$/],
            }
        }, {
            // test 可以是数组
            // test: /\.js$/,
            test: [/\.js$/, /\.jsx$/,],
            // use: ['babel-loader?cacheDirectory'],
            use: [{
                loader: 'babel-loader',
                options: {
                    // 从缓存目录里面取出
                    cacheDirectory: true,
                },
                // post:强制将该loader执行顺序放到最后，pre:强制将该loader放到最前面
                // enforce: 'post',
            }],
            enforce: 'post',
            parser: {
                harmoy: true,
            }
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            // loaders: ExtractTextPlugin.extract({
            //     use: ['css-loader'],
            // })
        }]
    },
    // 解析文件配置
    resolve: {
        // 别名
        alias: {
            proj: '../深入浅出webpack'
        },
        // 这个一般用的少，对于第三方依赖多份代码，做了指定
        mainFields: ['jsnext:main', 'browser', 'main',],
        // 补足后缀
        extensions: ['.tsx', '.ts', '.js', '.vue', '.json',],
        // 项目中存在大量导入代码的，可以指定路径。
        modules: ['./src/compontents', 'node_modules'],
        // 第三方模块描述文件
        descriptionFiles: ['package.json'],
        // 导入文件强制开启后缀
        // enforceExtension: true,
        // 下面的属性webpack5已经弃用
        // enforceModuleExtension: false,
    },
    // 插件拓展
    plugins: [
        //处理html
        new HtmlWebpackPlugin({
            template: 'public/index.html', //开发环境需要路径
            filename: 'index.html',
            chunks: ['main'],
            inject: 'body', //所有javascript资源将被放置在body元素的底部
            minify: {
                html5: true,
                collapseWhitespace: true //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            title: '练习webpack5配置',
            hash: true,
            showErrors: true
        }),
        // 把css资源分离出来
        new MiniCssExtractPlugin({
            filename: `[name]_[contenthash:8].css`,
        }),
        // webpack处理vue文件
        new VueLoaderPlugin(),
        new StylelintPlugin()
    ],
    // plugins: [
    // ExtractTextPlugin webpack5已经弃用
    //     new ExtractTextPlugin({
    //         filename: `[name]_[contenthash:8].css`,
    //     })
    // ]
    devServer: {
        // 开启热替换
        hot: true,
        // webpack5已经放弃
        // inline: true,
        // historyApiFallback 相当于路由配置
        // historyApiFallback: false,
        historyApiFallback: {
            rewrites: [{
                from: /error/,
                to: '/error.html'
            },
            ]
        },
        // http服务根目录
        static: path.join(__dirname, 'public'),
        // 添加响应头的信息
        headers: {
            'x-foo': 'bar',
        },
        // 指定ip地址，让局域网设备或者同事访问自己的电脑
        // host: '0.0.0.0',
        port: 8080,
        // 访问白名单域名，安全处理
        allowedHosts: ['192.168.20.246'],
        // 关闭host访问， webpack5已经弃用
        // disableHostCheck: true,
        // 开启https服务
        https: false,
        // 客户端日志
        client: {
            logging: 'info',
            progress: true,
        },
        // 启动gzip压缩
        compress: true,
        // 第一次自动打开页面
        open: false,
        // 高级监听文件变化
        watchFiles: {
            // paths: ['src/**/*.php', 'public/**/*'],
            options: {
                usePolling: false,
            },
        },
    },
    // 代码调试
    // source-map:在一个单独文件中产生一个完整且功能完全的文件。这个文件具有最好的source map,但是它会减慢打包速度；
    // cheap-module-source-map:在一个单独的文件中产生一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号）,会对调试造成不便。
    //  eval-source-map:使用eval打包源文件模块，在同一个文件中生产干净的完整版的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定要不开启这个选项。
    // cheap-module-eval-source-map:这是在打包文件时最快的生产source map的方法，生产的 Source map 会和打包后的JavaScript文件同行显示，没有影射列，和eval-source-map选项具有相似的缺点。
    // devtool: isProduction ? undefined : 'source-map',
    devtool: 'source-map',
    // 构建不同环境的代码
    target: 'web',
    // 根目录
    context: __dirname,
    // 运行环境已经内置该变量，无需打包
    externals: {
        'jquery': 'jQuery'
    },
    // 配置如何加载本地的loader
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js', '.json'],
        mainFields: ['loader', 'main'],
    },

}
