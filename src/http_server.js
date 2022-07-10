const express = require('express');
const { render } = require('./dist/bundle_server');
// console.log(render(), 'render');
const app = express();
// 调 用 构 建 出 的 bundle_server . js 中 暴 露 出 的 渣 染 函 数 , 再 拼 接 HTML 模 板 , 形 成 完 整 的HTML 文 件
app.get('/', function (req, res) {
    res.send(`
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
<div id="app">${render()}</div>
<!-- 导 入 Webpack 输 出 的 用 于 浏 览 器 端 波 染 的 JavaScript 文 件 -->
<script src="./dist/bundle_browser.js"></script>
</body>
</html>
`)
});
// 其 他 请 求 路 径 返 回 对 应 的 本 地 文 件
app.use(express.static('."'));
app.listen(3000, function () {
    console.log('app listening on port 3000!"')
})
