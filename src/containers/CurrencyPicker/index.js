import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import cx from 'classnames';
import View from '../../components/View';
import Nav from '../../components/Nav';
import Suggest from '../../components/Suggest';
import { updateSettings, toggleFavorite } from '../../actions';
import { toFixed } from '../../util';
import './currencyPicker.css';

@connect(state => state)
class CurrencyPicker extends Component {
  static propTypes = {
    showCurrencyPicker: PropTypes.bool.isRequired,
    favorites: PropTypes.array.isRequired,
    allCurrencies: PropTypes.array.isRequired,
    currencyPickerType: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    fromCurrency: PropTypes.string.isRequired,
    toCurrency: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    suggestInputting: PropTypes.bool,
    intl: intlShape.isRequired
  };

  static defaultProps = {
    suggestInputting: false
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

  onSuggestFocus() {
    this.props.dispatch(updateSettings({
      suggestInputting: true
    }));
  }

  onSuggestCancel() {
    this.props.dispatch(updateSettings({
      suggestInputting: false
    }));
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
      allCurrencies,
      suggestInputting,
      intl: { formatMessage }
    } = this.props;

    const suggestions = allCurrencies.map(currency => ({
      code: currency,
      text: formatMessage({ id: `app.currency.${currency}` })
    }));

    return (
      <View className={cx('currencyPicker', { inputMode: suggestInputting })} in={showCurrencyPicker}>
        <Nav
          hidden={suggestInputting}
          closeLabel="cancel"
          closeEvent={::this.onCloseClick}
        />
        <div className="content">
          <div className="searchBar">
            <Suggest
              placeholder={formatMessage({ id: 'app.currencyPicker.search' })}
              cancelLabel={formatMessage({ id: 'app.currencyPicker.cancel' })}
              suggestions={suggestions}
              onFocus={::this.onSuggestFocus}
              onCancel={::this.onSuggestCancel}
              onChoose={::this.onPicker}
              onStar={::this.onStarClick}
              favorites={favorites}
            />
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

export default injectIntl(CurrencyPicker);
