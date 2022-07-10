const path = require('path');
// extract-text-webpack-plugin 已经过时了
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//在vue-loader中拿到VueLoaderPlugin函数
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
// const StylelintPlugin = require('stylelint-webpack-plugin');
// 4.7 区分环境
const isProduction = process.env.NODE_ENV;
console.log(isProduction, 'isProduction');

module.exports = {
    // 模块的入口
    // entry: {name: './src/main.js', nameCopy: './main copy.js'},
    entry: () => {
        // return ['./ex6modules.js'];
        // return ['./src/main.js', './main copy.js'];
        // 为 了 支 持 模 块 热 替 换 , 注 入 代 理 客 尸 端
        return ['webpack-hot-middleware/client', './src/main.js'];
    },
    // content: path.resolve(__dirname, './public'),
    // 最终代码的输出
    output: {
        // [name] 对应 chunk的名称
        // filename: 'js/[id].[name].[hash:8].[chunkhash:8].bundle.js',
        filename: 'js/[name].[chunkhash:8].bundle.js',
        // chunkFilename 是一个被main.js异步加载的间接的JS文件。那么如果我们打包一个间接的JS文件的话，就会走chunkFilename这个配置项
        chunkFilename: 'chunkJs/[name].min.js',
        // path: path.resolve(__dirname, './dist_[hash]'),
        path: path.resolve(__dirname, './dist'),
        // 资源路径引用  /为根目录
        publicPath: '/dist/',
        // 4.9 cdn的引入
        // 指 定 存 放 JavaScript 文 件 的 CDN
        // publicPath: '//js.cdn.com/id/',
        // 用于配置crossOriginLoading配置异步插入标签的crossorigin值
        crossOriginLoading: 'use-credentials'
        // libraryTarget 导出库的方式： this commonjs commonjs2 var window global var是默认
        // libraryTarget: 'commonjs',
        // library: 'libraryName',
        // libraryExport: 'a'
    },
    // 热更新只在开发模式下有用
    mode: isProduction ? 'production' : 'development',
    module: {
        // noParse 处理 jquery|chartjs等没有处理模块化标准的工具
        // 缩小文件的查找范围 4.1.6
        // noParse: [/jquery|chartjs/, /react\.min\.js$/], // 不去解析jquery中的依赖关系，
        rules: [{
            // eslint-loader 代码检查
            test: [/\.js$/],
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
                // 放在最前
                enforce: 'prev'
            }
        }, {
            // tslint-loader 代码检查
            test: [/\.ts$/],
            loader: 'tslint-loader',
            exclude: /node_modules/,
            options: {
                // 放在最前
                enforce: 'prev'
            }
        }, {
            // 处理vue项目的文件
            // vue-loader: 将vue文件分为三部分样式，js和html。 css-loader处理样式  vue-template-compiler 处理html
            test: [/\.vue$/],
            use: ['vue-loader'],
            exclude: /node_modules/
        }, {
            // ts-loader 把typeScript转化为javascript的代码
            test: [/\.ts$/, /\.tsx$/],
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                // 让tsc将vue 文件当作typescript模块来处理
                appendTsSuffixTo: [/\.vue$/]
            }
        }, {
            // test 可以是数组
            // test: /\.js$/,
            test: [/\.js$/, /\.jsx$/],
            // use: ['babel-loader?cacheDirectory'],
            // 缩小文件的查找范围 4.1.1
            include: path.resolve(__dirname, 'src'),
            use: 'happypack/loader?id=js',
            // use: [{
            //     loader: 'babel-loader',
            //     options: {
            //         // 从缓存目录里面取出
            //         cacheDirectory: true
            //     }
            //     // post:强制将该loader执行顺序放到最后，pre:强制将该loader放到最前面
            //     // enforce: 'post',
            // }],
            enforce: 'post',
            parser: {
                harmoy: true
            }
        }, {
            // 4.8 css压缩 ： cssnano css-lodaer已经内置了 minimize 开启
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // 指 定 存 放 CSs 中 导 入 的 资 源 ( 例 如 图 片 ) 的 CDN 目 录 URL
                    publicPath: '//img.cdn.com/id/'
                }
            },
            { loader: 'css-loader' },
            // 使用loader的默认配置
            // 'postcss-loader',
            // 修改loader的配置
            {
                loader: 'postcss-loader'
            }]
        }, {
            // 处理图片
            test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
            use: [{
                loader: 'url-loader',
                options: {
                    // publicPath 其实是资源引入的前缀
                    publicPath: '/dist/image', // 相对打包后的index.html的图片位置
                    outputPath: 'image/', // 输出到build的目录image下
                    // 图片小于 10kb,会被 base64处理
                    limit: 10 * 1024,
                    esModule: false,
                    // 给图片重命名
                    name: '[name].[hash:6].[ext]'
                }
            }],
            type: 'javascript/auto'
        }]
    },
    // 解析文件配置
    resolve: {
        // 别名
        // 整体指定可以整体打包的包，不能使用于lodash,
        // 缩小文件的查找范围 4.1.4
        alias: {
            proj: '../深入浅出webpack'
            // 'react': path.resolve(__dirname, './node_modules/react/cjs/react.production.min.js')
        },
        // mainFields 是第三方模块的入口文件的描述
        // 缩小文件的查找范围 4.1.3  只用'main'
        mainFields: ['main'],
        // 补足后缀
        // 缩小文件的查找范围 4.1.5 extensions长度短，
        extensions: ['.tsx', '.ts', '.js'],
        // 项目中存在大量导入代码的，可以指定路径。
        // 缩小文件的查找范围 4.1.2
        modules: ['./src/compontents', path.resolve(__dirname, 'node_modules')],
        // 第三方模块描述文件
        descriptionFiles: ['package.json']
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
            filename: '[name]_[contenthash:8].css'
        }),
        // webpack处理vue文件
        new VueLoaderPlugin(),
        // new StylelintPlugin()
        // 为 了 支 持 模 块 热 替 换 , 生 成 .hot-update .json文 件
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin()
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../'), //根目录
            verbose: false, //开启在控制台输出信息
            cleanOnceBeforeBuildPatterns: [
                // 不清除dll文件夹
                '**/*',
                '!dll',
                '!dll/**'
            ]
        }),
        // 4.2 使用dll
        // 告诉webpack 哪些包不需要打包
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, './dist/dll/vendor.manifest.json')
        }),
        // 把js CSS资源放在html上
        new addAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, './dist/dll/vendor.dll.js')
        }),
        // 开启多进程打包 4.3
        new HappyPack({
            id: 'js',
            threads: 5,
            // 配置loader
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            // 共享进程池
            threadPool: happyThreadPool,
            // 日志输出
            verbose: true
        }),
        // 开启多进程打包 4.3
        // new HappyPack({
        //     id: 'css',
        //     threads: 5,
        //     // 配置loader
        //     loaders: ['css-loader'],
        //     // loaders: ['style-loader', 'css-loader', 'postcss-loader'],
        //     // 共享进程池
        //     threadPool: happyThreadPool,
        //     // 日志输出
        //     verbose: true
        // }),
        // 4.4 | 4.8 开启代码js压缩
        // 使用 ParallelUglifyPlugin 并行压缩输出JS代码
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS的参数如下：
            uglifyJS: {
                output: {
                    /*
                     是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
                     可以设置为false
                    */
                    beautify: false,
                    /*
                     是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
                    */
                    comments: false
                },
                // cacheDir: path.resolve(__dirname, '/dist/cacheDir'),
                compress: {
                    /*
                     是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
                    */
                    drop_console: true,
                    /*
                     是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不
                     转换，为了达到更好的压缩效果，可以设置为false
                    */
                    collapse_vars: true,

                    /*
                     是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
                     var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
                    */
                    reduce_vars: true
                }
            }
        })
    ],
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
            }
            ]
        },
        // http服务根目录
        static: path.join(__dirname, 'dist'),
        // 添加响应头的信息
        headers: {
            'x-foo': 'bar'
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
            progress: true
        },
        // 启动gzip压缩
        compress: true,
        // 4.5自动刷新页面
        // 第一次自动打开页面
        open: false,
        // 高级监听文件变化
        watchFiles: {
            options: {
                usePolling: false
            }
        }
    },
    // 代码调试
    // source-map:在一个单独文件中产生一个完整且功能完全的文件。这个文件具有最好的source map,但是它会减慢打包速度；
    // cheap-module-source-map:在一个单独的文件中产生一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号）,会对调试造成不便。
    //  eval-source-map:使用eval打包源文件模块，在同一个文件中生产干净的完整版的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定要不开启这个选项。
    // cheap-module-eval-source-map:这是在打包文件时最快的生产source map的方法，生产的 Source map 会和打包后的JavaScript文件同行显示，没有影射列，和eval-source-map选项具有相似的缺点。
    devtool: isProduction ? 'eval-cheap-module-source-map' : 'hidden-source-map',
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
        extensions: ['.js'],
        mainFields: ['loader', 'main']
    },
    // 开启监听模式 4.5.1
    watch: true,
    // 开启监听模式时，watchOptions才有意义
    watchOptions: {
        // 监听文件改变之后，等待300ms在去执行构建，防止文件更新太快，导致重新编译频率太高
        aggregateTimeout: 300,
        // 每一秒询问系统指定文件是否有发生改变的次数，这里是1000次
        poll: 1000,
        // 排除不需要监听的文件
        ignored: /node_modules/
    }
}
