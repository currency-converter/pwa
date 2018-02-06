module.exports = {
  parser: false,
  plugins: {
    // 注意插件顺序
    // @see https://github.com/postcss/postcss-import/issues/81
    'postcss-import': {},
    'postcss-cssnext': {}
  }
};
