const webpack = require('webpack');
const config = require('./webpack.config');
//如 果 不 传 cal1lback 回 调 函 数 作 为 第 2 个 参 数 , 就 会 返 回 一 个 Compiler 实 例 , 用 于 控 制启 动 , 而 不 是 像 上 面 那 样 立 即 启 动
// 换言之，就是监听模式运行
const compiler = webpack(config);
// 调 用 compiler .watch 并 以 监 听 模 式 启 动 , 返 回 的 watching 用 于 关 闭 监 听
const watching = compiler.watch({
    // watchOptions
    aggregateTimeout: 300,
}, (err, stats) => {
    // 每 次 因 文 件 发 生 变 化 而 重 新 执 行 完 构 建 户丑 皇
})
// 调 用 watching.c1lose 关 闭 监 听
watching.close(() => {
    // 在 监 听 关 闭 后
});