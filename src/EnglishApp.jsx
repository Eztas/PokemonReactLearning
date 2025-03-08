import App from './App';
import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';

function EnglishApp() {
  const {setLanguage} = useContext(PokemonContext); // ポケモンのデータを格納する

  setLanguage('en');
  
  return (
    <App />
  )
}

export default EnglishApp;