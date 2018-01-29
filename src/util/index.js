/**
 * 保留指定位数的小数，并对结果四舍五入
 * @param number {number}
 * @param decimals {number}
 * @return {number}
 */
export const toFixed = (number, decimals) => {
  // eslint-disable-next-line
  const pow = Math.pow(10, decimals);
  return Math.round(number * pow) / pow;
};

export const saveStorage = (value) => {
  // const { showSettings, ...rest } = value;
  localStorage.setItem('settings', JSON.stringify(value));
};

export const updateStorage = (value) => {
  const settings = localStorage.getItem('settings');
  const newSettings = { ...settings, value };
  localStorage.setItem('settings', JSON.stringify(newSettings));
};

export default {
  toFixed
};
