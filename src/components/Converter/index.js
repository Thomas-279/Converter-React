import React from 'react';
import Header from 'src/components/Header';
import Currencies from 'src/components/Currencies';
import Amount from 'src/components/Amount';
import Toggler from 'src/components/Toggler';

import currenciesData from 'src/data/currencies';
import './style.scss';

// pour pouvoir gérer un state, il faut passer la fonction Converter en class
// cette classe étendra la classe Component de React
class Converter extends React.Component {
  // grâce à @babel/plugin-proposal-class-properties on peut faire des propriétés de classe
  // qui nous permettent de s'affanchir du constructor pour le state et nous évite de lier
  // les méthodes au contexte de la classe.
  // Attention: il faut bien utiliser des fonctions flêchées pour les méthodes
  state = {
    open: true,
    baseAmount: 1,
    currency: 'United States Dollar',
    search: '',
  }

  // avec des composants en classe on a accès aux lifecycles
  // Les lifecycles offrent la possibilité d'intéragir avec le DOM
  // on a 3 phases principales pour notre composant
  // - naissance: phase de montage => componentDidMount
  // - vie : phase de mise à jour => componentDidUpdate
  // - mort : phase de démontage => componentWillUnmount

  componentDidMount() {
    this.changePageTitleEffect();
    // pour les requêtes API c'est ici !
    // un exemple
    // api.getCurrencies()
    //   .then((response) => this.setState({
    //     currencies: response.data.currencies
    //   }))
    //   .catch((err) => console.log(err));
    // document.body.addEventListener('click', () => console.log('hello'));
  }

  componentDidUpdate(prevProps, prevState) {
    // je récupère la valeur de currency du state courant
    const { currency } = this.state;
    // je viens la comparer avec l'ancien state
    // et si la valeur de currency à changée alors
    // j'exécute la fonction changePageTitleEffect
    if (currency !== prevState.currency) {
      this.changePageTitleEffect();
    }
  }

  componentWillUnmount() {
    // par exemple ici on peut retirer des listeners
    // document.body.removeEventListener('click', () => console.log('hello'));
  }

  changePageTitleEffect = () => {
    const { currency } = this.state;
    document.title = `Euro to ${currency}`;
  }

  toggle = () => {
    const { open } = this.state;
    // NE PAS CHANGER LES VALEURS DU STATE DIRECTEMENT
    // this.state.open = !this.state.open;

    // pour changer une valeur du state, il faut TOUJOURS passer par this.setState
    // c'est une méthode qui va informer React qu'il y a eu un changement dans le state.
    // React effectuera ainsi un nouveau rendu du composant
    this.setState({
      open: !open,
    });
  }

  // on prépare une fonction qui va être charge de changer
  // la valeur de la propriété currency du state
  setCurrency = (currency) => {
    this.setState({
      currency,
    });
  }

  makeConversion = () => {
    const { baseAmount, currency } = this.state;

    // on va rechercher le taux de change
    const foundCurrency = currenciesData.find((element) => element.name === currency);

    // on va faire la convertion qu'on renverra
    const convertedAmount = baseAmount * foundCurrency.rate;

    return Math.round(convertedAmount * 100) / 100;
  }

  // fonction qui va être en charge de modifier la valeur
  // de la propriété search du state
  // on lui passe cette nouvelle valeur en paramètre
  setSearch = (value) => {
    this.setState({
      search: value,
    });
  }

  setBaseAmount = (value) => {
    this.setState({
      baseAmount: value,
    });
  }

  getCurrencies = () => {
    // par défaut je veux retourner la liste complète des devise
    let filteredCurrencies = currenciesData;
    const { search } = this.state;
    // si search n'est pas égal à une chaine de caractère vide, on filtre les devises
    // if (search !== '') {
    // on peut utiliser la valeur truthy de la chaine de caractère non-vide
    if (search) {
      // on vient filtrer la liste des devises
      filteredCurrencies = currenciesData.filter((currency) => {
        // on passe tout en minuscule pour comparer ce qui est comparable
        const loweredCurrency = currency.name.toLowerCase();
        const loweredSearch = search.toLowerCase();
        // ici on vient tester si dans la chaine de caractère du nom de la devises
        // on a bien ce qu'on a dans la recherche
        return loweredCurrency.includes(loweredSearch);
      });
    }

    return filteredCurrencies;
  }

  render() {
    // pour retourner le JSX de notre composant
    // la classe Component de React nous met à disposition la méthode render()
    // à chaque fois qu'une valeur du state change, la fonction render() sera réexécutée

    // on récupère les valeurs du state en le destructurant
    const {
      open,
      baseAmount,
      currency,
      search,
    } = this.state;

    const convertedAmount = this.makeConversion();
    const filteredCurrencies = this.getCurrencies();

    return (
      <div className="converter">
        <Header
          baseAmount={baseAmount}
          setBaseAmount={this.setBaseAmount}
        />
        <Toggler onClickButton={this.toggle} isOpen={open} />
        {open && (
          <Currencies
            currencies={filteredCurrencies}
            setCurrency={this.setCurrency}
            inputValue={search}
            setSearchValue={this.setSearch}
          />
        )}
        <Amount
          value={convertedAmount}
          currency={currency}
        />
      </div>
    );
  }
}

export default Converter;
