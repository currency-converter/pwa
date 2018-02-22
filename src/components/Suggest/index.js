import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
                suggestions
                  .filter((s) => {
                    const keyword = value.toUpperCase();
                    const { code, text } = s;
                    return code.indexOf(keyword) > -1 || text.toUpperCase().indexOf(keyword) > -1;
                  })
                  .map((s) => {
                    const { code, text } = s;
                    const starIcon = favorites.indexOf(code) < 0 ? 'C' : 'B';
                    return (
                      <div
                        key={`currency-${code}`}
                        className={cx('item')}
                        onClick={this.onChoose.bind(this, code)}
                      >
                        <div className="star cc" onClick={this.onStar.bind(this, code)}>{starIcon}</div>
                        <div className="name">{code}</div>
                        <div className="fullname">
                          <span>{text}</span>
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
