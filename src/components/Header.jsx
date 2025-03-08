import { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonProvider';
import { Link } from "react-router-dom";

function Header() {
  const {language} = useContext(PokemonContext); // ポケモンのデータを格納する

  const headerTranslations = {
    en: {
      header: "Pokedex",
      linkText: "Please click here to look at Japanese Pokedex",
      linkPath: "/JapaneseApp"
    },
    ja: {
      header: "ポケモン図鑑", // 正しい日本語テキスト
      linkText: "英語版ポケモン図鑑はこちらから",
      linkPath: "/EnglishApp"
    }
  };

  return (
    <div>
      <h1>{headerTranslations[language].header}</h1>
      <Link to={headerTranslations[language].linkPath}>{headerTranslations[language].linkText}</Link>
    </div>
  );
}
export default Header;
