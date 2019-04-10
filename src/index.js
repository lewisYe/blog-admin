import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import './index.css';
import ErrorBoundary from './components/errorBoundary';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn'

ReactDOM.render(
  <ErrorBoundary>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </ErrorBoundary>,
  document.getElementById('app')
);