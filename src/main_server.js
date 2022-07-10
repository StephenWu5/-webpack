import React from 'react';
import { renderToString } from 'react-dom/server'
// 这里注意模板的非默认导出和默认导出对应关系
import AppComponent from './AppComponent';
// class AppComponent extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return <div>服务端渲染</div>
//     }
// };

// 导 出 渣 染 函 数 , 以 供 采 用 Node .js 编 写 的 HTTP 服 务 器 代 码 调 用
export function render() {
    // 将 根 组 件 混 染 成 HTMI 字 符 串
    return renderToString(<AppComponent />);
}