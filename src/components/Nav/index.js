/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './nav.css';

const mapStateToProps = state => state;

@connect(mapStateToProps)
export default class Nav extends Component {
  static propTypes = {
    closeLabel: PropTypes.string.isRequired,
    closeEvent: PropTypes.func.isRequired
  };

  render() {
    const { closeLabel, closeEvent } = this.props;
    return (
      <div className="nav">
        <button onClick={closeEvent}>
          <FormattedMessage id={`app.nav.${closeLabel}`} />
        </button>
      </div>
    );
  }
}
