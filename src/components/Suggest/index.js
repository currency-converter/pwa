import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import './suggest.css';

const mapStateToProps = state => state;

@connect(mapStateToProps)
export default class Nav extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    suggestions: PropTypes.array,
    overlay: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func,
    onStar: PropTypes.func,
    cancelLabel: PropTypes.string,
    favorites: PropTypes.array
  };

  static defaultProps = {
    placeholder: 'Search',
    suggestions: [],
    overlay: true,
    onFocus: () => {},
    onChange: () => {},
    onCancel: () => {},
    onChoose: () => {},
    onStar: () => {},
    cancelLabel: 'Cancel',
    favorites: []
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
      value: ''
    };
  }

  onFocus() {
    this.setState({
      isFocus: true
    });
    this.props.onFocus();
  }

  onCancel() {
    this.setState({
      isFocus: false,
      value: ''
    });
    this.props.onCancel();
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ value });
    this.props.onChange(value);
  }

  onChoose(result) {
    this.props.onChoose(result);
    this.onCancel();
  }

  onStar(value, event) {
    this.props.onStar(value, event);
  }

  render() {
    const {
      placeholder,
      suggestions,
      overlay,
      cancelLabel,
      favorites
    } = this.props;

    const { isFocus, value } = this.state;

    return (
      <div className="suggest">
        <div className="suggest-input">
          <input
            className="keyword"
            type="search"
            placeholder={placeholder}
            value={value}
            onFocus={::this.onFocus}
            onChange={::this.onChange}
          />
          {
            isFocus && <span className="cancel" onClick={::this.onCancel}>{cancelLabel}</span>
          }
        </div>
        {
          isFocus && (
            <div className={cx('suggest-suggestions', 'group', { hidden: !value })}>
              {
                suggestions.filter(s => s.indexOf(value.toUpperCase()) > -1).map((s) => {
                  const starIcon = favorites.indexOf(s) < 0 ? 'C' : 'B';
                  return (
                    <div
                      key={`currency-${s}`}
                      className={cx('item')}
                      onClick={this.onChoose.bind(this, s)}
                    >
                      <div className="star cc" onClick={this.onStar.bind(this, s)}>{starIcon}</div>
                      <div className="name">{s}</div>
                      <div className="fullname">
                        <FormattedMessage id={`app.currency.${s}`} />
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )
        }
        {
          overlay && <div className={cx('suggest-overlay', { hidden: !isFocus })} />
        }
      </div>
    );
  }
}
