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
// eslint-disable-next-line
// import(/* webpackPrefetch: true, webpackChunkName: "video" */ './call.js').then(() => {
//     console.log('加载完成')
// })
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