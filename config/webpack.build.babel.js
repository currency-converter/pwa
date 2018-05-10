/**
 * 这个文件可以修改build的默认设置
 * 默认配置请看 `node_modules/packing/config/webpack.build.babel.js`
 *
 * @param object webpackConfig 默认配置对象
 * @param object program packing-cli程序对象
 * @param object appConfig config/packing.js中的配置
 */

import OfflinePlugin from 'offline-plugin';

export default (webpackConfig/* , program, appConfig */) => {
  const config = webpackConfig;
  config.plugins.push(new OfflinePlugin({
    // 缓存首页
    externals: ['/'],

    // 禁用 appcache
    AppCache: false
  }));

  return config;
};
