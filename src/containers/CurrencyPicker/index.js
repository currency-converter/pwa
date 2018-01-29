import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import View from '../../components/View';
import Nav from '../../components/Nav';
import { updateSettings, toggleFavorite } from '../../actions';
import { toFixed } from '../../util';
import './currencyPicker.css';

@connect(state => state)
export default class CurrencyPicker extends Component {
  static propTypes = {
    showCurrencyPicker: PropTypes.bool.isRequired,
    favorites: PropTypes.array.isRequired,
    allCurrencies: PropTypes.array.isRequired,
    currencyPickerType: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    fromCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return true;
  }

  onCloseClick() {
    const { dispatch } = this.props;
    dispatch(updateSettings({
      showCurrencyPicker: false
    }));
  }

  onPicker(value) {
    const {
      dispatch,
      currencyPickerType,
      fromCurrency,
      toCurrency,
      rates
    } = this.props;
    let rate;
    if (currencyPickerType === 'from') {
      rate = rates[toCurrency] / rates[value];
    } else {
      rate = rates[value] / rates[fromCurrency];
    }
    rate = toFixed(rate, 5);
    dispatch(updateSettings({
      showCurrencyPicker: false,
      [`${currencyPickerType}Currency`]: value,
      rate
    }));
  }

  onStarClick(currency, event) {
    event.stopPropagation();
    this.props.dispatch(toggleFavorite(currency));
    this.forceUpdate();
  }

  renderList(currencies) {
    const {
      favorites,
      currencyPickerType,
      fromCurrency,
      toCurrency
    } = this.props;
    const currencySign = currencyPickerType === 'from' ? fromCurrency : toCurrency;

    return currencies.map((currency) => {
      const starIcon = favorites.indexOf(currency) < 0 ? 'C' : 'B';

      return (
        <div
          key={`currency-${currency}`}
          className={cx('item', { current: currencySign === currency })}
          onClick={this.onPicker.bind(this, currency)}
        >
          <div className="star cc" onClick={this.onStarClick.bind(this, currency)}>{starIcon}</div>
          <div className="name">{currency}</div>
          <div className="fullname">
            <FormattedMessage id={`app.currency.${currency}`} />
          </div>
        </div>
      );
    });
  }

  render() {
    const {
      showCurrencyPicker,
      favorites,
      allCurrencies
    } = this.props;

    return (
      <View className="currencyPicker" in={showCurrencyPicker}>
        <Nav closeLabel="cancel" closeEvent={this.onCloseClick.bind(this)} />
        <div className="content">
          <div className="searchBar">
            <input type="search" placehold="Search" />
          </div>
          <div className="favorites group">
            <div className="title">
              <FormattedMessage id="app.currencyPicker.favorites" />
            </div>
            <div className="currencies">{this.renderList(favorites)}</div>
          </div>
          <div className="allCurrencies group">
            <div className="title">
              <FormattedMessage id="app.currencyPicker.allCurrencies" />
            </div>
            <div className="currencies">{this.renderList(allCurrencies)}</div>
          </div>
        </div>
      </View>
    );
  }
}
