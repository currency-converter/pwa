/**
 * 这个文件可以修改build的默认设置
 * 默认配置请看 `node_modules/packing/config/webpack.build.babel.js`
 *
 * @param object webpackConfig 默认配置对象
 * @param object program packing-cli程序对象
 * @param object appConfig config/packing.js中的配置
 */

import OfflinePlugin from 'offline-plugin';
import ReplaceHashWebpackPlugin from 'replace-hash-webpack-plugin';

export default (webpackConfig, program, appConfig) => {
  const config = webpackConfig;
  const {
    path: {
      templatesDist,
      assetsDist
    },
    templateExtension,
    fileHashLength
  } = appConfig;

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
    ServiceWorker: {
      publicPath: '/sw.js'
    },
    safeToUseOptionalCaches: true
  }));

  // 删除原有的 ReplaceHashPlugin
  config.plugins = config.plugins
    .filter(plugin => plugin.constructor.name !== 'ReplaceHashPlugin');

  // 替换 首页pug 中的 manifest.json
  config.plugins.push(new ReplaceHashWebpackPlugin({
    cwd: templatesDist,
    src: `**/*${templateExtension}`,
    dest: templatesDist,
    exts: ['js', 'css', 'png', 'json']
  }));

  // 替换 manifest.json 中的图片
  config.plugins.push(new ReplaceHashWebpackPlugin({
    cwd: assetsDist,
    src: 'manifest*.json',
    dest: assetsDist,
    exts: ['png']
  }));

  // manifest.json 专用 loader
  config.module.rules.push({
    test: /manifest.json$/,
    loader: 'file-loader',
    options: {
      name: `[name]-[hash:${fileHashLength}].[ext]`
    }
  });

  return config;
};
