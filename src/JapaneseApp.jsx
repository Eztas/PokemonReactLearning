import App from './App';
import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';

function JapaneseApp() {
  const {setLanguage} = useContext(PokemonContext); // ポケモンのデータを格納する

  setLanguage('ja');
  
  return (
    <App />
  )
}

export default JapaneseApp;
