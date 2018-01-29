import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import './spinButton.css';

@connect()
export default class SpinButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    disabled: false,
    step: 1,
    min: 0,
    max: 1000000000
  };

  onIncrease() {
    this.onChange(this.props.step);
  }

  onDecrease() {
    this.onChange(this.props.step * -1);
  }

  onChange(step) {
    const {
      min,
      max,
      value,
      onChange
    } = this.props;
    const newValue = value + step;
    if (min <= newValue && max >= newValue) {
      onChange(newValue);
    }
  }

  render() {
    const { disabled } = this.props;
    return (
      <div className={cx('spinButton', { disabled })}>
        <button onClick={this.onDecrease.bind(this)}>-</button>
        <button onClick={this.onIncrease.bind(this)}>+</button>
      </div>
    );
  }
}
