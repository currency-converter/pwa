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
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (webpackConfig, program, appConfig) => {
  const config = webpackConfig;
  const {
    path: {
      templates,
      assetsDist
    } // ,
    // fileHashLength
  } = appConfig;

  config.plugins.push(new OfflinePlugin({
    externals: ['/'],

    // ServiceWorker: {
    //   output: '../templates/sw.js',
    //   publicPath: '/sw.js',
    //   minify: false
    //   // events: true
    // },

    AppCache: false
  }));

  // 删除原有的 ReplaceHashPlugin
  const uselessPlugins = [
    'UncommentBlock',
    'ReplaceHashPlugin',
    'CommonsChunkPlugin'
  ];
  config.plugins = config.plugins
    .filter(plugin => uselessPlugins.indexOf(plugin.constructor.name) < 0);

  config.plugins.push(new HtmlWebpackPlugin({
    title: 'Currency Converter',
    template: `${templates}/index.html`,
    // filename: '../templates/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  }));

  // 替换 首页中的 manifest.json
  // config.plugins.push(new ReplaceHashWebpackPlugin({
  //   cwd: assetsDist,
  //   src: 'index.html',
  //   dest: assetsDist,
  //   exts: ['js', 'css', 'png']
  // }));

  // 替换 manifest.json 中的图片
  config.plugins.push(new ReplaceHashWebpackPlugin({
    cwd: assetsDist,
    src: 'manifest.json',
    dest: assetsDist,
    exts: ['png']
  }));

  config.plugins.push(new CopyWebpackPlugin([
    { from: 'assets/manifest.json', to: 'manifest.json' }
  ]));

  // manifest.json 专用 loader
  // config.module.rules.push({
  //   test: /manifest.json$/,
  //   loader: 'file-loader',
  //   options: {
  //     name: '[name].[ext]'
  //   }
  // });

  // console.log(config);

  return config;
};
