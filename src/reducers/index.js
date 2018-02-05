import { UPDATE_SETTINGS, TOGGLE_FAVORITE } from '../actions';
import { saveStorage } from '../util';

const settings = localStorage.getItem('settings');

let initialState;
if (settings) {
  initialState = JSON.parse(settings);
  initialState.showSettings = false;
  initialState.showCurrencyPicker = false;
} else {
  initialState = {
    showSettings: false,
    showCurrencyPicker: false,
    decimals: 2,
    fromCurrency: 'USD',
    toCurrency: 'CNY',
    currencyPickerType: '',
    rate: 6.4363,
    enableCustomRate: false,
    enableAutoUpdate: true,
    enableHourlyUpdate: false,
    updatedAt: 1516270561999,
    favorites: [
      'USD', 'CNY', 'JPY', 'HKD'
    ],
    allCurrencies: [
      'AED', 'AUD', 'BGN', 'BHD', 'BND', 'BRL', 'BYN', 'CAD', 'CHF', 'CLP',
      'CNY', 'COP', 'CRC', 'CZK', 'DKK', 'DZD', 'EGP', 'EUR', 'GBP', 'HKD',
      'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'ISK', 'JOD', 'JPY', 'KES',
      'KHR', 'KRW', 'KWD', 'LAK', 'LBP', 'LKR', 'MAD', 'MMK', 'MOP', 'MXN',
      'MYR', 'NOK', 'NZD', 'OMR', 'PHP', 'PLN', 'QAR', 'RON', 'RSD', 'RUB',
      'SAR', 'SEK', 'SGD', 'SYP', 'THB', 'TRY', 'TWD', 'TZS', 'UGX', 'USD',
      'VND', 'ZAR'
    ],
    rates: {
      AED: 3.6725,
      AUD: 1.2522,
      BGN: 1.598,
      BHD: 0.3767,
      BND: 1.327,
      BRL: 3.2018,
      BYN: 2.02,
      CAD: 1.24602,
      CHF: 0.96303,
      CLP: 604.7,
      CNY: 6.3977,
      COP: 2849.4,
      CRC: 564,
      CZK: 20.7479,
      DKK: 6.07965,
      DZD: 113.827,
      EGP: 17.69,
      EUR: 0.8163,
      GBP: 0.71548,
      HKD: 7.8176,
      HRK: 6.0667,
      HUF: 252.65,
      IDR: 13317,
      ILS: 3.4142,
      INR: 63.7825,
      IQD: 1184,
      ISK: 102.75,
      JOD: 0.7075,
      JPY: 111.131,
      KES: 102.45,
      KHR: 4010,
      KRW: 1070.36,
      KWD: 0.3003,
      LAK: 8282,
      LBP: 1511,
      LKR: 154.15,
      MAD: 9.2223,
      MMK: 1334,
      MOP: 8.0495,
      MXN: 18.7152,
      MYR: 3.928,
      NOK: 7.8705,
      NZD: 1.3645,
      OMR: 0.3848,
      PHP: 51.08,
      PLN: 3.4036,
      QAR: 3.6408,
      RON: 3.8087,
      RSD: 96.6421,
      RUB: 56.464,
      SAR: 3.7499,
      SEK: 8.03665,
      SGD: 1.31881,
      SYP: 514.98,
      THB: 31.81,
      TRY: 3.7865,
      TWD: 29.236,
      TZS: 2241,
      UGX: 3623,
      USD: 1,
      VND: 22709,
      ZAR: 12.0978
    }
  };
  saveStorage(initialState);
}

export default (state = initialState, action) => {
  const { type, newSettings, currency } = action;
  let index;

  switch (type) {
    case UPDATE_SETTINGS:
      state = { ...state, ...newSettings };
      break;
    case TOGGLE_FAVORITE:
      index = state.favorites.indexOf(currency);

      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(currency);
      }
      break;
    default:
  }
  saveStorage(state);
  return state;
};
