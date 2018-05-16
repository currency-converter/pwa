/**
 * 这个文件可以修改packing配置文件的默认设置
 * 默认配置请看 `node_modules/packing/config/packing.js`
 *
 * @param object packing 默认配置对象
 */

export default (packing) => {
  const p = packing;

  p.path.entries = {
    index: './src/entries/index.js'
  };
  // html 模版类型没有 layouts 和 pages
  p.path.dist.templates = 'templates';

  p.template.options.engine = 'html';
  p.template.options.extension = '.html';
  p.template.options.master = 'src/templates/default.html';
  p.template.options.favicon = '/assets/images/logo/128.png';
  p.template.options.injectManifest = true;

  p.visualizer.enabled = false;

  // 将所有 js 打成一个包
  p.commonChunks = {};

  p.rewriteRules = {
    // 网站URL与模版的对应路由关系
    '^/$': '/index',
    // '^/manifest.json': 'require!/mock/manifest.js',
    // API转发
    '^/api/(.*)': 'require!/mock/api/$1.js'
  };

  return p;
};
