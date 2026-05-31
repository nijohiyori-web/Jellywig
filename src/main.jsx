// ============================================================
// main.jsx —— 整個網站的「起點」
// ------------------------------------------------------------
// 瀏覽器打開網頁時，第一個執行的就是這個檔案。
// 它的工作只有一件事：把我們寫的 <App /> 畫到畫面上。
// ============================================================

// React 是負責「畫畫面」的工具
import React from 'react';
// ReactDOM 是負責「把畫面放進瀏覽器」的工具
import ReactDOM from 'react-dom/client';
// App 就是我們整個網站的最外層元件（等一下會看 App.jsx）
import App from './App.jsx';
// 匯入全站共用的 CSS 樣式
import './styles/global.css';

// 步驟 1：找到 index.html 裡 id 叫 "root" 的那個空盒子
const rootElement = document.getElementById('root');

// 步驟 2：用 React 接管這個盒子
const root = ReactDOM.createRoot(rootElement);

// 步驟 3：把 <App /> 畫進去
// React.StrictMode 是「嚴格模式」，它會在開發時幫我們抓出潛在問題，
// 不影響使用者看到的畫面，可以先把它當成一個保護殼。
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
