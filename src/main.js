import React from 'react';
import { createRoot } from 'react-dom/client';
import Button from './react.tsx';
require('./main.css');
// import _ from 'lodash';
const show = require('./show');
// const show2 = require('./show');

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Button />);
// import vue from './vue.vue'
// 4.12 代码分割达到按需加载
// 以 ./show.js 为 入 口 重 新 生 成 一 个 Chunk;
// 当 代 码 执 行 到 import 所 在 的 语 句 时 才 去 加 载 由 Chunk 对 应 生 成 的 文件
document.querySelector('html').addEventListener('click', () => {
    import(/* webpackChunkName: 'video' */ './call.js').then(({show}) => {
        console.log(show, '加载完成');
        // show('加载完成');
    });
});

// const some = require('./some');
// let obj = {
//     name: '周星驰'
// };
// console.log(_.get(obj, 'name', ''), some, '1111');
show('webpack');
// 接收热更新输出，只有accept才能被更新
// 4.6 热替换
if (module.hot) {
    module.hot.accept();
}