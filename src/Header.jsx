import { useContext } from 'react';
import { PokemonContext } from './PokemonProvider';
import { Link } from "react-router-dom";

function Header() {
  const {language} = useContext(PokemonContext); // ポケモンのデータを格納する
  return (
    <div>
      {language === "en" ? (
        <div>
          <h1>Pokedex</h1>
          <Link to="/JapaneseApp">Please click here to look at Japanese Pokedex</Link>
        </div>
      ) : (
        <div>
          <h1>ポケモン図鑑</h1>
          <Link to="/EnglishApp">英語版ポケモン図鑑はこちらから</Link>
        </div>
      )}
    </div>
  );
}
export default Header;
