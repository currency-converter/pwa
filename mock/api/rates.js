/**
 * Ajax异步请求数据模拟文件
 * 对应的URL为/api/rates
 * @module mock/api/rates
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 * @return {object} Mock json data
 */

export default (req, res) => {
  const data = {
    updatedAt: Date.now(),
    rates: {
      AED: 3.6725,
      AUD: 1.2522,
      BGN: 1.598,
      BHD: 0.3767,
      BND: 1.327,
      BRL: 3.2018,
      BYN: 2.02,
      CAD: 1.24539,
      CHF: 0.9621,
      CLP: 604.7,
      CNY: 6.281,
      COP: 2849.4,
      CRC: 564,
      CZK: 20.7177,
      DKK: 6.0717,
      DZD: 113.826,
      EGP: 17.68,
      EUR: 0.8155,
      GBP: 0.71501,
      HKD: 7.8172,
      HRK: 6.061,
      HUF: 252.37,
      IDR: 13317,
      ILS: 3.4092,
      INR: 63.78,
      IQD: 1184,
      ISK: 102.75,
      JOD: 0.7075,
      JPY: 111.026,
      KES: 102.45,
      KHR: 4010,
      KRW: 1069.41,
      KWD: 0.3003,
      LAK: 8282,
      LBP: 1511,
      LKR: 154.15,
      MAD: 9.2084,
      MMK: 1335,
      MOP: 8.0495,
      MXN: 18.699,
      MYR: 3.928,
      NOK: 7.86132,
      NZD: 1.364,
      OMR: 0.3848,
      PHP: 51.06,
      PLN: 3.3989,
      QAR: 3.6398,
      RON: 3.8063,
      RSD: 96.6421,
      RUB: 56.4642,
      SAR: 3.7499,
      SEK: 8.02868,
      SGD: 1.31855,
      SYP: 514.98,
      THB: 31.81,
      TRY: 3.7824,
      TWD: 29.216,
      TZS: 2241,
      UGX: 3623,
      USD: 1,
      VND: 22709,
      ZAR: 12.0883
    }
  };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};
