import App from './App';
import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';

function EnglishApp() {

  //const english = 'en';
  const {setLanguage} = useContext(PokemonContext); // ポケモンのデータを格納する

  setLanguage('en');

  return (
    //<App language={english} />
    <App />
  )
}

export default EnglishApp;