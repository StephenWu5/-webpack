// import _ from 'lodash';
// import Button from './react.tsx';
// import vue from './vue.vue'
// eslint-disable-next-line
// import(/* webpackPrefetch: true, webpackChunkName: "video" */ './call.js').then(() => {
//     console.log('加载完成')
// })
const show = require('./show');
// const some = require('./some');
// let obj = {
//     name: '周星驰'
// };
require('./main.css');
// console.log(_.get(obj, 'name', ''), some, '1111');

show('webpack1');
// console.log('webpack');
// console.log('webpack');
// 接收热更新输出，只有accept才能被更新
if (module.hot) {
    module.hot.accept();
}