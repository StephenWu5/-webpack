// import _ from 'lodash';
const show = require('./show');
const some = require('./some');
import Button from './react.tsx';
import vue from './vue.vue'
import(/* webpackPrefetch: true, webpackChunkName: "video" */ './call.js').then(() => {
    console.log('加载完成')
})
let obj = {
    name: '周星驰'
};
require('./main.css');
console.log(_.get(obj, 'name', ''), some,'1111');

show('webpack');
console.log('webpack');
console.log('webpack');