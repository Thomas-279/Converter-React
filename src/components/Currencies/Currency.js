import React from 'react';
import PropTypes from 'prop-types';

const Currency = ({ text, onClickCurrency }) => (
  <li className="currency" onClick={() => onClickCurrency(text)}>{text}</li>
);

Currency.propTypes = {
  text: PropTypes.string.isRequired,
  onClickCurrency: PropTypes.func.isRequired,
};

export default Currency;
