import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import './view.css';

const TRANSITION_DURATION = 300; // ms

@connect()
export default class View extends Component {
  static propTypes = {
    className: PropTypes.string,
    in: PropTypes.bool,
    children: PropTypes.node,
    duration: PropTypes.number,
    defaultStyle: PropTypes.object,
    transitionStyle: PropTypes.object
  };

  static defaultProps = {
    className: '',
    in: false,
    children: null,
    duration: TRANSITION_DURATION,
    defaultStyle: {
      transitionProperty: 'top,opacity',
      transitionDuration: `${TRANSITION_DURATION}ms`,
      transitionTimingFunction: 'ease-in-out',
      top: '100%',
      display: 'none'
    },
    transitionStyle: {
      entering: { top: '100%', opacity: 0 },
      entered: { top: 0, opacity: 1 }
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { transitionStyle: { entered, entering }, duration } = this.props;

    if (nextProps.in !== this.props.in) {
      if (nextProps.in) {
        this.show();
        setTimeout(() => {
          this.setState({
            style: {
              ...this.state.style,
              ...entered
            }
          });
        }, 100);
      } else {
        window.scrollTo(0, 0);
        this.setState({
          style: {
            ...this.state.style,
            ...entering
          }
        });
        setTimeout(() => {
          this.hide();
        }, 100 + duration);
      }
    }
  }

  show() {
    this.setState({
      style: {
        display: 'block'
      }
    });
  }

  hide() {
    this.setState({
      style: {}
    });
  }

  render() {
    const {
      className,
      children,
      defaultStyle
    } = this.props;

    const style = { ...defaultStyle, ...this.state.style };

    return (
      <section className={cx('view', className)} style={style}>
        {children}
      </section>
    );
  }
}
