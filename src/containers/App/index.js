import React from 'react';
import Calculator from '../Calculator';
import Settings from '../Settings';
import CurrencyPicker from '../CurrencyPicker';
import './app.css';

export default () => (
  <div className="pages">
    <Calculator />
    <Settings />
    <CurrencyPicker />
  </div>
);
