/**
 * Ajax异步请求数据模拟文件
 * 对应的URL为/api/rates
 * @module mock/api/rates
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 * @return {object} Mock json data
 */

export default (req, res) => {
  console.log('====', req.acceptsLanguages());
  const data = {};
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};
