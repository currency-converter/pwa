import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import './view.css';

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
    duration: 300,
    defaultStyle: {
      transition: 'top 300ms ease-in-out',
      top: '100%',
      display: 'none'
    },
    transitionStyle: {
      entering: { top: '100%' },
      entered: { top: 0 }
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
