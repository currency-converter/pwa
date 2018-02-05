/**
 * Ajax异步请求数据模拟文件
 * 对应的URL为/api/documentLastModified
 * @module mock/api/rates
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 * @return {object} Mock json data
 */

import { readFileSync, statSync } from 'fs';
import { resolve } from 'path';
import url from 'url';

export default (req, res) => {
  const { t } = req.query
  const file = resolve('prd/assets/index.html');
  const { mtimeMs } = statSync(file);

  if (t < mtimeMs) {
    const html = readFileSync(file);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Last-Modified', new Date(mtimeMs).toUTCString());
    res.end(html);
  } else {
    res.statusCode = 204;
    res.end();
  }
};
