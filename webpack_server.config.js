// 服务端打包
const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    // JavaScript 执 行 入 口 文 件
    entry: './main_server.js',
    // !为 了 不 将 Node.js 内 置 的 模 块 打 包 进 输 出 文 件 中
    // 指定代码的运行环境
    target: 'node',
    //防止node modules 目 录 下 的 第 三 方 模 块 打 包 进 输 出 文 似 中
    externals: [nodeExternals()],
    output: {
        //为 了 以 CommonJS2 规 范 导 出 浩 染 函 数 , 以 被 采 用 Node . js 编 写 的 HTTP 服 务 调 用
        libraryTarget: 'commonjs2',
        // Ax 将 最 终 可 在 Node .js 中 运 行 的 代 码 输 出 到 bundle_server .js 文 件 中
        filename: 'bundle_server.js',
        //) 将 辖 出 文 件 都 放 到 aist 日 录 下
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: path.resolve(__dirname, 'node_modules'),
        }, {
            test: /\.css$/,
            use: ['ignore-loader'],
        },]
    },
    devtool: 'source-map',
}
