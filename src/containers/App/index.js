/* eslint-disable */
import React, { Component } from 'react';
import Calculator from '../Calculator';
import Settings from '../Settings';
import CurrencyPicker from '../CurrencyPicker';
import './app.css';

export default class App extends Component {
  render() {
    return (
      <div className="pages">
        <Calculator />
        <Settings />
        <CurrencyPicker />
      </div>
    );
  }
}
