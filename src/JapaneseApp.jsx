import App from './App';
import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';

function JapaneseApp() {

  //const japanese = 'ja';
  const {setLanguage} = useContext(PokemonContext); // ポケモンのデータを格納する

  setLanguage('ja');
  return (
    //<App language={japanese} />
    <App />
  )
}

export default JapaneseApp;
