import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import Switch from 'rc-switch';
import cx from 'classnames';
import 'rc-switch/assets/index.css';
import { toFixed } from '../../util';
import { updateSettings } from '../../actions';
import Nav from '../../components/Nav';
import View from '../../components/View';
import SpinButton from '../../components/SpinButton';
import './settings.css';

@connect(state => state)
export default class Settings extends Component {
  static propTypes = {
    showSettings: PropTypes.bool.isRequired,
    updatedAt: PropTypes.number.isRequired,
    decimals: PropTypes.number.isRequired,
    enableAutoUpdate: PropTypes.bool.isRequired,
    enableCustomRate: PropTypes.bool.isRequired,
    enableHourlyUpdate: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    fromCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    rates: PropTypes.object.isRequired
  };

  onCloseClick() {
    const { dispatch } = this.props;
    dispatch(updateSettings({
      showSettings: false
    }));
  }

  onAutoUpdateClick(value) {
    const { dispatch } = this.props;
    dispatch(updateSettings({
      enableAutoUpdate: value,
      enableHourlyUpdate: false
    }));
  }

  onHourlyUpdateClick(value) {
    this.props.dispatch(updateSettings({
      enableHourlyUpdate: value
    }));
  }

  onEnableCustomRateClick(value) {
    const {
      dispatch,
      rates,
      toCurrency,
      fromCurrency
    } = this.props;

    dispatch(updateSettings({
      enableCustomRate: value,
      rate: toFixed(rates[toCurrency] / rates[fromCurrency], 5)
    }));
  }

  onCustomRateInput(event) {
    const { value } = event.target;
    if (value.length > 0) {
      this.props.dispatch(updateSettings({
        rate: parseFloat(value, 10)
      }));
    }
  }

  onDecimalsChange(value) {
    this.props.dispatch(updateSettings({
      decimals: value
    }));
  }

  render() {
    const {
      showSettings,
      updatedAt,
      decimals,
      enableAutoUpdate,
      enableCustomRate,
      enableHourlyUpdate,
      fromCurrency,
      toCurrency,
      rate
    } = this.props;

    return (
      <View className="settings" in={showSettings}>
        <Nav closeLabel="done" closeEvent={this.onCloseClick.bind(this)} />
        <div className="content">
          <div className="groupList">
            <div className="gHeader">
              <FormattedMessage id="app.settings.rateTitle" />
            </div>
            <div className="gBody">
              <div className="gItem">
                <FormattedMessage id="app.settings.updatedAt" />
                <FormattedRelative value={updatedAt} />
              </div>
              <div className="gItem">
                <FormattedMessage id="app.settings.autoUpdateRates" />
                <Switch
                  className="positionFix"
                  checked={enableAutoUpdate}
                  onChange={this.onAutoUpdateClick.bind(this)}
                />
              </div>
              <div className="gItem">
                <FormattedMessage id="app.settings.hourlyUpdate" />
                <Switch
                  className="positionFix"
                  disabled={!enableAutoUpdate}
                  checked={enableHourlyUpdate}
                  onChange={this.onHourlyUpdateClick.bind(this)}
                />
              </div>
            </div>
            <div className="gFooter">
              <FormattedMessage id="app.settings.rateFooter" />
            </div>
          </div>
          <div className="groupList">
            <div className="gBody">
              <div className="gItem">
                <FormattedMessage id="app.settings.customRate" />
                <Switch
                  className="positionFix"
                  defaultChecked={enableCustomRate}
                  onChange={this.onEnableCustomRateClick.bind(this)}
                />
              </div>
              <div className={cx('gItem', { disabled: !enableCustomRate })}>
                <div>
                  <span>1 {fromCurrency} = </span>
                  <input
                    disabled={!enableCustomRate}
                    className="customRateInput"
                    type="number"
                    defaultValue={rate}
                    onChange={this.onCustomRateInput.bind(this)}
                  />
                  <span>{toCurrency}</span>
                </div>
                <span />
              </div>
            </div>
          </div>
          <div className="groupList">
            <div className="gBody">
              <div className="gItem">
                <span>
                  {`${decimals} `}
                  <FormattedMessage id="app.settings.decimals" />
                </span>
                <SpinButton
                  step={1}
                  min={0}
                  max={5}
                  value={decimals}
                  onChange={this.onDecimalsChange.bind(this)}
                />
              </div>
            </div>
            <div className="gFooter">
              <FormattedMessage id="app.settings.decimalsFooter" />
            </div>
          </div>
          <p className="useProtocol">
            <FormattedMessage id="app.settings.disclaimer" />
          </p>
        </div>
      </View>
    );
  }
}
