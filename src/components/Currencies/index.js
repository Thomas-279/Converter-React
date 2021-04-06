import React from 'react';
import PropTypes from 'prop-types';

import Currency from './Currency';

import './style.scss';

const Currencies = ({
  currencies,
  setCurrency,
  inputValue,
  setSearchValue,
}) => {
  const currenciesList = currencies.map((currency) => {
    // on vient sotcker la valeur du nom de la devise
    const currencyName = currency.name;
    // on retourne un composant Currency pour chaque élément du nouveau tableau
    // attetion, il faut bien penser à rajouter la prop key pour chaque élément de cet tableau
    return (
      <Currency
        key={currency.name}
        text={currencyName}
        onClickCurrency={setCurrency}
      />
    );
  });

  // const currenciesList = currencies.map((currency) => <Currency text={currency.name} />);
  // React.createElement(Currencies, null);
  return (
    <div className="currencies">
      <input
        className="currencies__input"
        type="text"
        placeholder="Rechercher une devise"
        value={inputValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <ul className="currencies__list">
        {currenciesList}
      </ul>
    </div>
  );
};

Currencies.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setCurrency: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default Currencies;
