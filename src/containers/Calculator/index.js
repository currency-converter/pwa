import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import axios from 'axios';
import cx from 'classnames';
import { updateSettings } from '../../actions';
import { toFixed } from '../../util';
import './index.css';

// 允许输入的最大长度
const FROM_MONEY_MAX_LENGTH = 15;

@connect(state => state)
export default class Calculator extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fromCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string.isRequired,
    enableAutoUpdate: PropTypes.bool.isRequired,
    updatedAt: PropTypes.number.isRequired,
    enableCustomRate: PropTypes.bool.isRequired,
    enableHourlyUpdate: PropTypes.bool.isRequired,
    rate: PropTypes.number.isRequired,
    decimals: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      fromMoney: (1).toFixed(this.props.decimals),
      isEmpty: true,
      showTips: true
    };

    // 检查汇率更新
    setInterval(this.checkUpdate.bind(this), 3600 * 1000);

    // 汇率更新信息显示60秒后隐藏
    setTimeout(() => {
      this.setState({
        showTips: false
      });
    }, 6 * 1000);
  }

  onInput(n) {
    // 每次输入时只改变 fromMoney 的值，通过汇率计算出 toMoney
    let { fromMoney } = this.state;
    const { isEmpty } = this.state;

    if (this.state.isEmpty) {
      fromMoney = '';
    }

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
          fromMoney = isEmpty ? n : fromMoney + n;
          this.setState({
            fromMoney,
            isEmpty: false
          });
        }
        break;
      case '.':
        if (fromMoney.indexOf('.') < 0 && fromMoney.length < FROM_MONEY_MAX_LENGTH) {
          fromMoney += `${isEmpty ? '0' : ''}.`;
          this.setState({
            fromMoney,
            isEmpty: false
          });
        }
        break;
      case '0':
        if (fromMoney !== '0' && fromMoney.length < FROM_MONEY_MAX_LENGTH) {
          fromMoney += '0';
          this.setState({
            fromMoney,
            isEmpty: false
          });
        }
        break;
      case 'c':
        this.setState({
          fromMoney: (1).toFixed(this.props.decimals),
          isEmpty: true
        });
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
      enableHourlyUpdate,
      toCurrency,
      fromCurrency
    } = this.props;

    const diff = new Date().getTime() - updatedAt;
    // 每小时 or 每天更新
    const updatable = diff > (enableHourlyUpdate ? 1 : 24) * 3600 * 1000;
    if (navigator.onLine && enableAutoUpdate && updatable) {
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
    const { fromMoney, showTips } = this.state;

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
              <span>{fromMoney}</span>
            </div>
            <div className="abbreviation" onClick={this.onCurrencyPickerClick.bind(this, 'from')}>{fromCurrency}</div>
          </div>
          <div className="to">
            <div className="money" style={toMoneyStyle}>
              <span>{toMoney}</span>
            </div>
            <div className="abbreviation" onClick={this.onCurrencyPickerClick.bind(this, 'to')}>
              {toCurrency}
              { enableCustomRate && (<sup>*</sup>) }
            </div>
          </div>
          <div className={cx('tips', { show: showTips })}>
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
                <td onClick={this.onSettingsClick.bind(this)} className="cc gear">A</td>
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
