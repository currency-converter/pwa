/**
 * 这个文件可以修改serve的默认设置
 * 默认配置请看 `node_modules/packing/config/webpack.serve.babel.js`
 *
 * @param object webpackConfig 默认配置对象
 * @param object program packing-cli程序对象
 * @param object appConfig config/packing.js中的配置
 */

import OfflinePlugin from 'offline-plugin';

export default (webpackConfig/* , program, appConfig */) => {
  const config = webpackConfig;

  // manifest.json 专用 loader
  config.module.rules.push({
    test: /manifest.json$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    }
  });

  // PWA 插件
  config.plugins.push(new OfflinePlugin({
    caches: {
      main: [
        // These assets don't have a chunk hash.
        // SW fetch them on every SW update.
        // './',
        ':rest:'
      ],
      additional: [':externals:']
    },
    externals: ['./'],
    safeToUseOptionalCaches: true
  }));

  return config;
};
