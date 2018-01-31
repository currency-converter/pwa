import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import reducer from '../reducers';
import App from '../containers/App';
// import '../../assets/manifest.json';
import '../../assets/images/16.png';
import '../../assets/images/32.png';
import '../../assets/images/128.png';
import '../../assets/images/144.png';
import '../../assets/images/152.png';
import '../../assets/images/192.png';
import '../../assets/images/256.png';
import '../../assets/images/512.png';

let lang;
switch (navigator.language) {
  case 'zh-CN':
    lang = 'zh-CN';
    break;
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

OfflinePluginRuntime.install();

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
);
