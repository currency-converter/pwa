import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedRelative, FormattedNumber } from 'react-intl';
import axios from 'axios';
import { updateSettings } from '../../actions';
import { toFixed } from '../../util';
import './index.css';

// 计算器默认初始化金额
const FROM_MONEY_DEFAULT_VALUE = '0';

// 允许输入的最大长度
const FROM_MONEY_MAX_LENGTH = 15;

@connect(state => state)
export default class Calculator extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fromCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string.isRequired,
    enableAutoUpdate: PropTypes.bool.isRequired,
    enableCustomRate: PropTypes.bool.isRequired,
    updatedAt: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    decimals: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      fromMoney: FROM_MONEY_DEFAULT_VALUE
    };

    setInterval(this.checkUpdate.bind(this), 3000);
  }

  onInput(n) {
    // 每次输入时只改变 fromMoney 的值，通过汇率计算出 toMoney
    let { fromMoney } = this.state;

    switch (n) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (fromMoney.length < FROM_MONEY_MAX_LENGTH) {
          fromMoney = fromMoney === FROM_MONEY_DEFAULT_VALUE ? n : fromMoney + n;
          this.setState({ fromMoney });
        }
        break;
      case '.':
        if (fromMoney.indexOf('.') < 0 && fromMoney.length < FROM_MONEY_MAX_LENGTH) {
          fromMoney += '.';
          this.setState({ fromMoney });
        }
        break;
      case '0':
        if (fromMoney !== FROM_MONEY_DEFAULT_VALUE && fromMoney.length < FROM_MONEY_MAX_LENGTH) {
          fromMoney += '0';
          this.setState({ fromMoney });
        }
        break;
      case 'c':
        this.setState({ fromMoney: FROM_MONEY_DEFAULT_VALUE });
        break;
      default:
    }
  }

  onSettingsClick() {
    const { dispatch } = this.props;
    dispatch(updateSettings({
      showSettings: true
    }));
  }

  onCurrencyPickerClick(currencyPickerType) {
    const { dispatch } = this.props;
    dispatch(updateSettings({
      showCurrencyPicker: true,
      currencyPickerType
    }));
  }

  checkUpdate() {
    const {
      enableAutoUpdate,
      updatedAt,
      dispatch,
      enableCustomRate,
      toCurrency,
      fromCurrency
    } = this.props;

    const diff = new Date().getTime() - updatedAt;
    if (navigator.onLine && enableAutoUpdate && diff > 3600 * 1000) {
      const url = '/api/rates';
      axios.get(url)
        .then((res) => {
          const newSettings = res.data;
          if (!enableCustomRate) {
            // 未启用自定义汇率时，需要更新当前汇率
            const { rates } = newSettings;
            newSettings.rate = toFixed(rates[toCurrency] / rates[fromCurrency], 5);
          }
          dispatch(updateSettings(newSettings));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  exchange(money) {
    const { rate, decimals } = this.props;
    return toFixed(money * rate, decimals);
  }

  render() {
    const {
      fromCurrency,
      toCurrency,
      updatedAt,
      enableCustomRate
    } = this.props;
    const { fromMoney } = this.state;

    // 根据汇率计算兑换后的货币数目
    const toMoney = this.exchange(fromMoney);

    let fromMoneyStyle = {
      fontSize: '3rem'
    };
    if (fromMoney.length > 7) {
      fromMoneyStyle = {
        fontSize: '2.5rem'
      };
    }
    if (fromMoney.length > 10) {
      fromMoneyStyle = {
        fontSize: '2rem'
      };
    }
    if (fromMoney.length > 13) {
      fromMoneyStyle = {
        fontSize: '1.5rem'
      };
    }

    let toMoneyStyle = {
      fontSize: '3rem'
    };
    if (toMoney.toString().length > 7) {
      toMoneyStyle = {
        fontSize: '2.5rem'
      };
    }
    if (toMoney.toString().length > 10) {
      toMoneyStyle = {
        fontSize: '2rem'
      };
    }
    if (toMoney.toString().length > 13) {
      toMoneyStyle = {
        fontSize: '1.5rem'
      };
    }

    return (
      <section className="calculator">
        <div className="screen">
          <div className="from">
            <div className="money" style={fromMoneyStyle}>
              <FormattedNumber value={fromMoney} />
            </div>
            <div className="abbreviation" onClick={this.onCurrencyPickerClick.bind(this, 'from')}>{fromCurrency}</div>
          </div>
          <div className="to">
            <div className="money" style={toMoneyStyle}>
              <FormattedNumber value={toMoney} />
            </div>
            <div className="abbreviation" onClick={this.onCurrencyPickerClick.bind(this, 'to')}>
              {toCurrency}
              { enableCustomRate && (<sup>*</sup>) }
            </div>
          </div>
          <div className="message">
            <p>
              <FormattedMessage id="app.calculator.updatedAt" />
              {' '}
              <FormattedRelative value={updatedAt} />
            </p>
          </div>
        </div>
        <div className="keyboard">
          <table>
            <tbody>
              <tr>
                <td onClick={this.onInput.bind(this, '7')}>7</td>
                <td onClick={this.onInput.bind(this, '8')}>8</td>
                <td onClick={this.onInput.bind(this, '9')}>9</td>
                <td rowSpan="4" className="clean" onClick={this.onInput.bind(this, 'c')}>C</td>
              </tr>
              <tr>
                <td onClick={this.onInput.bind(this, '4')}>4</td>
                <td onClick={this.onInput.bind(this, '5')}>5</td>
                <td onClick={this.onInput.bind(this, '6')}>6</td>
              </tr>
              <tr>
                <td onClick={this.onInput.bind(this, '1')}>1</td>
                <td onClick={this.onInput.bind(this, '2')}>2</td>
                <td onClick={this.onInput.bind(this, '3')}>3</td>
              </tr>
              <tr>
                <td onClick={this.onSettingsClick.bind(this)} className="cc">A</td>
                <td onClick={this.onInput.bind(this, '0')}>0</td>
                <td onClick={this.onInput.bind(this, '.')}>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
