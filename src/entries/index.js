/* eslint no-fallthrough: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import reducer from '../reducers';
import App from '../containers/App';
import '../../assets/images/logo/128.png';
import '../../assets/images/logo/256.png';
import '../../assets/images/logo/512.png';

let lang;
switch (navigator.language) {
  // 以下使用简体中文
  // Chinese
  case 'zh':
  // 简体
  case 'zh-Hans':
  // 中华人民共和国
  case 'zh-CN':
  // 新加坡
  case 'zh-SG':
    lang = 'zh-CN';
    break;

  // 以下使用繁体中文
  // 繁体
  case 'zh-Hant':
  // 香港
  case 'zh-HK':
  // 澳门
  case 'zh-MO':
  // 台湾
  case 'zh-TW':
    lang = 'zh-TW';
    break;

  // 日文
  case 'ja':
    lang = 'ja';
    break;

  // 其他地区使用英文
  default:
    lang = 'en-US';
}

// eslint-disable-next-line
const appLocale = require(`../locale/${lang}`);
addLocaleData(appLocale.data);

const store = createStore(reducer);

if (['beta', 'production'].indexOf(process.env.NODE_ENV) > -1) {
  OfflinePluginRuntime.install();
}
// OfflinePluginRuntime.install();

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
