import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Header = ({ baseAmount, setBaseAmount }) => {
  const handleOnChange = (event) => {
    // const parsedValue = parseFloat(event.target.value, 10);
    const parsedValue = Number(event.target.value);

    setBaseAmount(parsedValue);
  };

  return (
    <header className="header">
      <h1 className="header__title">Converter</h1>
      <p className="header__base-amount">
        <input
          type="number"
          className="header__input"
          value={baseAmount}
          min={0}
          onChange={handleOnChange}
        />
        Euro
      </p>
    </header>
  );
};

Header.propTypes = {
  baseAmount: PropTypes.number.isRequired,
  setBaseAmount: PropTypes.func.isRequired,
};

export default Header;
