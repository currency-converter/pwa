import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import './nav.css';

const mapStateToProps = state => state;

@connect(mapStateToProps)
export default class Nav extends Component {
  static propTypes = {
    hidden: PropTypes.bool,
    closeLabel: PropTypes.string,
    closeEvent: PropTypes.func
  };

  static defaultProps = {
    hidden: false,
    closeLabel: () => {},
    closeEvent: () => {}
  };

  render() {
    const { closeLabel, closeEvent, hidden } = this.props;
    return (
      <div className={cx('nav', { hidden })}>
        <button onClick={closeEvent}>
          <FormattedMessage id={`app.nav.${closeLabel}`} />
        </button>
      </div>
    );
  }
}
