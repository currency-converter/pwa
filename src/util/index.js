/**
 * 保留指定位数的小数，并对结果四舍五入
 * @param {number} number 需要处理的原始数字
 * @param {number} decimals 需要保留的数据精度
 * @return {number} 处理后的数字
 */
export const toFixed = (number, decimals) => {
  // eslint-disable-next-line
  const pow = Math.pow(10, decimals);
  return Math.round(number * pow) / pow;
};

/**
 * 将数据保存到 localStorge
 * @param {object} value JSON对象
 * @return {null} null
 */
export const saveStorage = (value) => {
  // const { showSettings, ...rest } = value;
  localStorage.setItem('settings', JSON.stringify(value));
};

/**
 * 将数据更新到 localStorge
 * @param {object} value JSON对象
 * @return {null} null
 */
export const updateStorage = (value) => {
  const settings = localStorage.getItem('settings');
  const newSettings = { ...settings, value };
  localStorage.setItem('settings', JSON.stringify(newSettings));
};

export default {
  toFixed
};
