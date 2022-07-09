const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const app = express();
//如 果 不 传 cal1lback 回 调 函 数 作 为 第 2 个 参 数 , 就 会 返 回 一 个 Compiler 实 例 , 用 于 控 制启 动 , 而 不 是 像 上 面 那 样 立 即 启 动
// 换言之，就是监听模式运行
const compiler = webpack(config);
// 为 了 支 持 模 块 热 替 换 , 响 应 用 于 替 换 老 模 块 的 资 源

app.use(webpackDevMiddleware(compiler, {
    // 默认是 config.output.publicPath
    // publicPath: config.output.publicPath
}));
// re ti huan
app.use(require('webpack-hot-middleware')(compiler, {
    reload: true
}));

// 将 项 目 根 目 录 作 为 静 态 资 源 目 录 , 用 于 服 务 HTML 文 件
app.use(express.static('.'));
app.listen(3000);
