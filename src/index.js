// == Import : npm
import React from 'react';
import { render } from 'react-dom';

// == Import : local
// Composants
// j'adapte mon point d'entrée pour coller au mieux à ce que sera mon application
// le chemin peut être en relatif
// import Converter from './components/Converter';
// ou en version absolue grâce à l'alias définit dans la config de webpack
import Converter from 'src/components/Converter';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = <Converter />;
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
