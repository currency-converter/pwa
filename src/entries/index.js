/* eslint no-fallthrough: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import reducer from '../reducers';
import App from '../containers/App';
// import '../../assets/images/logo/128.png';
// import '../../assets/images/logo/256.png';
// import '../../assets/images/logo/512.png';

const checkLang = lang => new RegExp(`^${lang}`, 'i').test(navigator.language);
const checkHant = () => /hant|hk|mo|tw/i.test(navigator.language);

let lang;
switch (true) {
  // 中文
  case checkLang('zh'):
    lang = `zh-${checkHant() ? 'TW' : 'CN'}`;
    break;

  // 日文
  case checkLang('ja'):
    lang = 'ja';
    break;

  // 其他地区使用英文
  default:
    lang = 'en';
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
