require('./main.css');
import _ from 'lodash';
const show = require('./show');
import(/* webpackPrefetch: true, webpackChunkName: "video" */ './call.js').then(() => {
    console.log('加载完成')
})
let obj = {
    name: '周星驰'
};
console.log(_.get(obj, 'name', ''),'1111');

show('webpack');
console.log('webpack');
console.log('webpack');