import React from "react"; // フックを入れていないから、DOMを扱う場合はこのインポートが必要らしい
import { Link } from "react-router-dom";

function Header({ language }) {
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
